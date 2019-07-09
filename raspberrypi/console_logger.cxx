#include <iostream>
#include <ctime>
#include "console_logger.h"
#include "utility.h"


ConsoleLogger::~ConsoleLogger() {};

void ConsoleLogger::error(std::string message){
	std::time_t nowTime = std::time(nullptr);	
	std::cerr << stripTimeLinefeed(std::asctime(std::localtime(&nowTime))) << "ConsoleLogger::error " << message << std::endl;
}
void ConsoleLogger::warning(std::string message){
	std::time_t nowTime = std::time(nullptr);	
	std::cerr << stripTimeLinefeed(std::asctime(std::localtime(&nowTime))) << "ConsoleLogger::warning " << message << std::endl;	
}
void ConsoleLogger::info(std::string message){
	std::time_t nowTime = std::time(nullptr);	
	std::cout << stripTimeLinefeed(std::asctime(std::localtime(&nowTime))) <<" ConsoleLogger::info " << message << std::endl;
}

