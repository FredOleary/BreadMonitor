#include <iostream>
#include "console_logger.h"


ConsoleLogger::~ConsoleLogger() {};

void ConsoleLogger::error(std::string message){
	std::cerr << "ConsoleLogger::error " << message << std::endl;
}
void ConsoleLogger::warning(std::string message){
	std::cerr << "ConsoleLogger::warning " << message << std::endl;	
}
void ConsoleLogger::info(std::string message){
	std::cout << "ConsoleLogger::info " << message << std::endl;
}

