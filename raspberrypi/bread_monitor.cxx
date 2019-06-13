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
#include "observer.h"
#include "http_observer.h"
#include "co2_sensor.h"
#include "configuration.h"

int main(int argc, char **argv)
{
	Configuration configuration;
	std::vector<Observer*> observers;
	std::vector<Sensor*> sensors;
	
//	std::time_t start = std::time(nullptr);
	std::time_t start = configuration.getStartTime();

 	std::cout << "BreadMonitor started at " << std::asctime(std::localtime(&start)) << std::endl;
 	
 	std::string name("fred");
  	std::unique_ptr<HttpObserver> httpObserverPtr(new HttpObserver());
 	httpObserverPtr->open(name);
	httpObserverPtr->close();
 	observers.push_back(httpObserverPtr.get());
 	
  	std::unique_ptr<CO2Sensor> co2SensorPtr(new CO2Sensor());
 	co2SensorPtr->open(name);
	co2SensorPtr->close();
 	sensors.push_back(co2SensorPtr.get());
  	
 
	return 0;
}

