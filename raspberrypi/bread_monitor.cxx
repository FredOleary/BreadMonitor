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
#include "observer.h"
#include "http_observer.h"
#include "console_observer.h"
#include "co2_sensor.h"
#include "reading.h"
#include "configuration.h"
#include "console_logger.h"

void parseOptions( int argc, char **argv, Configuration& configuration );
void run( Configuration& configuration, Logger& logger, std::vector<Observer*> observers, std::vector<Sensor*> sensors );

int main(int argc, char **argv)
{
	ConsoleLogger logger;
	logger.error( "Error Message" );
	logger.warning( "Warning Message" );
		
	Configuration configuration;
	std::vector<Observer*> observers;
	std::vector<Sensor*> sensors;
	
	parseOptions( argc, argv, configuration);
	std::time_t start = configuration.getStartTime();
	std::time_t end = configuration.getEndTime();
	
	std::string startMessage = "BreadMonitor for " + configuration.getName() +
		" starting at " + std::asctime(std::localtime(&start)) + 
		" ending at " + std::asctime(std::localtime(&end)) ;
	logger.info( startMessage );
 	
   	std::unique_ptr<HttpObserver> httpObserverPtr(new HttpObserver(configuration));
 	observers.push_back(httpObserverPtr.get());

   	std::unique_ptr<ConsoleObserver> ConsoleObserverPtr(new ConsoleObserver(logger));
  	observers.push_back(ConsoleObserverPtr.get());
	
  	std::unique_ptr<CO2Sensor> co2SensorPtr(new CO2Sensor());
 	sensors.push_back(co2SensorPtr.get());
 	run( configuration, logger, observers, sensors );
	
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

void run( Configuration& configuration, Logger& logger, std::vector<Observer*> observers, std::vector<Sensor*> sensors ){
	// Open observers
	for (auto it = observers.begin(); it!=observers.end(); ++it) {
		if( !(*it)->open( configuration.getName())){
			// Observer failed: - exit
			logger.error("Failed to open one or more observers - exiting....");
		}
	}	
	bool foo = true;
	while(foo){
		std::time_t currentTime = std::time(nullptr);
		if( std::difftime( configuration.getEndTime(), currentTime ) > 0){
			// Take sensor reading
			logger.info( "Reading....");
			for (auto sensor_it = sensors.begin(); sensor_it!=sensors.end(); ++sensor_it) {
				std::vector<ReadingPtr> readings = (*sensor_it)->getReading();
			
				for (auto observer_it = observers.begin(); observer_it!=observers.end(); ++observer_it) {
					(*observer_it)->update( readings);
				}		
			}		

			sleep(10);
			//foo = false;
		}else{
			break;
		}
	}
	// Close observers
	for (auto it = observers.begin(); it!=observers.end(); ++it) {
		(*it)->close( );
	}	
}

