#include <iostream>
#include "co2_sensor.h"
	
	
	
bool CO2Sensor::open( std::string name ){
	std::cout << "CO2Sensor::open" << std::endl;
	return true;
}	

void CO2Sensor::close() {
	std::cout << "CO2Sensor::close" << std::endl;
}
std::vector<Reading> CO2Sensor::getReading(){
	std::vector<Reading> co2Reading;
	std::cout << "CO2Sensor::getReading" << std::endl;
	return co2Reading;
}

