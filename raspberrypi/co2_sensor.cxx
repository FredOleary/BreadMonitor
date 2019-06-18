#include <iostream>
#include <memory>
#include "co2_sensor.h"
#include "co2_reading.h"	


std::vector<ReadingPtr> getFooReading(){
	std::cout << "CO2Sensor::getReading" << std::endl;
	std::vector<ReadingPtr> co2ReadingList;
	ReadingPtr reading (new CO2Reading());
	co2ReadingList.push_back( reading );
	return co2ReadingList;
	
//	std::vector<Reading*> co2ReadingList;
//	std::unique_ptr<Reading> reading(new CO2Reading());

//	co2ReadingList.push_back(reading.get());
//	return NULL;
//	return co2ReadingList;
}

	
	
bool CO2Sensor::open( std::string name ){
	std::cout << "CO2Sensor::open" << std::endl;
	return true;
}	

void CO2Sensor::close() {
	std::cout << "CO2Sensor::close" << std::endl;
}
std::vector<ReadingPtr> CO2Sensor::getReading(){
	std::cout << "CO2Sensor::getReading" << std::endl;
	std::vector<ReadingPtr> co2ReadingList;
	ReadingPtr reading (new CO2Reading());
	co2ReadingList.push_back( reading );
	return co2ReadingList;
}

