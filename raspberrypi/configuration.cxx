
#include <iostream>
#include <ctime>
#include "configuration.h"
	
Configuration::Configuration(){
	startTime = std::time(nullptr);
	endTime = std::time(nullptr);
	durationInHours = 12; // 12 hour duration
	endTime += (durationInHours*60*60);	
	name = "Batch";
}

std::time_t Configuration::getStartTime() const {
	return startTime;
}
std::time_t Configuration::getEndTime() const{
	return endTime;
}
std::string Configuration::getName() const{
	return name;
}

void Configuration::setName( std::string newName ){
	name = newName;
}

void Configuration::setDuration( int durationInHoursIn ){
	durationInHours = durationInHoursIn;
	endTime = startTime + (durationInHours*60*60);
}
