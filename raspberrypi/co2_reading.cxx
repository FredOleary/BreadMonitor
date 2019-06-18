#include "co2_reading.h"


CO2Reading::~CO2Reading() {};

std::string CO2Reading::getName() const{
	return std::string("CO2" );
}
double CO2Reading::getValue(){
	return 4.2;
}

