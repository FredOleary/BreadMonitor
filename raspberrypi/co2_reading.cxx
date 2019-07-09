#include <random>
#include <iostream>
#include "co2_reading.h"


CO2Reading::~CO2Reading() {};

CO2Reading::CO2Reading( int valueIn){
	value = static_cast<double>(valueIn);
//	std::random_device rd;
//    std::mt19937 gen(rd());
//    generator = gen;
//    std::uniform_int_distribution<int> dis(1, 19);
//	  distribution = dis;
}
std::string CO2Reading::getName() const{
	return std::string("co2" );
}
double CO2Reading::getValue(){
//	int val = distribution(generator);
	return value;
}

