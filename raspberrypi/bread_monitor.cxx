/*
 * bread_monitor.cxx
 * 
 * Copyright 2019  <pi@raspberrypi>
 * 
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
 * MA 02110-1301, USA.
 * 
 * 
 */


#include <iostream>
#include <ctime>
#include <vector>
#include <memory>
#include <unistd.h>
#include <wiringPi.h>
#include "observer.h"
#include "http_observer.h"
#include "console_observer.h"
#include "co2_sensor.h"
#include "reading.h"
#include "configuration.h"
#include "console_logger.h"
#include "utility.h"
#include "LED.h"

void parseOptions( int argc, char **argv, Configuration& configuration );
void run( Configuration& configuration, LED& readingLED, Logger& logger, std::vector<Observer*> observers, std::vector<Sensor*> sensors );

int main(int argc, char **argv)
{
	ConsoleLogger logger;
	
	wiringPiSetup() ;
	
	LED readingLED;
	
	Configuration configuration;
	std::vector<Observer*> observers;
	std::vector<Sensor*> sensors;
	
	parseOptions( argc, argv, configuration);
	std::time_t start = configuration.getStartTime();
	std::time_t end = configuration.getEndTime();
	
	std::string startMessage = "BreadMonitor for " + configuration.getName() +
		" starting at " + stripTimeLinefeed(std::asctime(std::localtime(&start)))+ 
		" ending at " + stripTimeLinefeed(std::asctime(std::localtime(&end))) ;
	logger.info( startMessage );
 	
   	std::unique_ptr<HttpObserver> httpObserverPtr(new HttpObserver(logger, configuration));
 	observers.push_back(httpObserverPtr.get());

   	std::unique_ptr<ConsoleObserver> ConsoleObserverPtr(new ConsoleObserver(logger));
  	observers.push_back(ConsoleObserverPtr.get());
	
  	std::unique_ptr<CO2Sensor> co2SensorPtr(new CO2Sensor(logger));
 	sensors.push_back(co2SensorPtr.get());
 	run( configuration, readingLED, logger, observers, sensors );
	
	return 0;
}

void parseOptions( int argc, char **argv, Configuration& configuration ){
  char *nvalue = NULL;
  char *dvalue = NULL;
  int c;

  opterr = 0;

	while ((c = getopt (argc, argv, "n:d:")) != -1){
		switch (c){
		  case 'n':
			nvalue = optarg;
			break;
		  case 'd':
			dvalue = optarg;
			break;
		  default:
			break;
		  }
	}
	if( nvalue != NULL ){
		configuration.setName( std::string( nvalue ));
	}
	if( dvalue != NULL){
		configuration.setDuration( atoi(dvalue));
	}
}

void run( Configuration& configuration, LED& readingLED, Logger& logger, std::vector<Observer*> observers, std::vector<Sensor*> sensors ){
bool inLoop = true;

	// Open observers
	for (auto it = observers.begin(); it!=observers.end(); ++it) {
		if( !(*it)->open( configuration.getName())){
			// Observer failed: - exit
			inLoop = false;
			logger.error("Failed to open one or more observers - exiting....");
		}
	}	
	// Open sensors
	for (auto it = sensors.begin(); it!=sensors.end(); ++it) {
		if( !(*it)->open( "/dev/serial0" )){
			// sensor failed: - exit
			inLoop = false;
			logger.error("Failed to open one or more sensors - exiting....");
		}
	}	
	while(inLoop){
		std::time_t currentTime = std::time(nullptr);
		if( std::difftime( configuration.getEndTime(), currentTime ) > 0){
			readingLED.turnON();
			// Take sensor reading
			logger.info( "Reading....");
			for (auto sensor_it = sensors.begin(); sensor_it!=sensors.end(); ++sensor_it) {
				std::vector<ReadingPtr> readings = (*sensor_it)->getReading();
			
				for (auto observer_it = observers.begin(); observer_it!=observers.end(); ++observer_it) {
					(*observer_it)->update( readings);
				}		
			}		
			readingLED.turnOFF();
			sleep(10);
			//inLoop = false;
		}else{
			break;
		}
	}
	// Close sensors
	for (auto it = sensors.begin(); it!=sensors.end(); ++it) {
		(*it)->close( );
	}	
	// Close observers
	for (auto it = observers.begin(); it!=observers.end(); ++it) {
		(*it)->close( );
	}	
}

