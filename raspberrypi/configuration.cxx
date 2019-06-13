
#include <iostream>
#include <ctime>
#include "configuration.h"
	
Configuration::Configuration(){
	startTime = std::time(nullptr);
	endTime = std::time(nullptr);
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
