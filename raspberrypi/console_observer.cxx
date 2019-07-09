#include <iostream>
#include <memory.h>
#include "console_observer.h"
	
ConsoleObserver::ConsoleObserver( Logger& loggerIn) : logger(loggerIn){

}
	
bool ConsoleObserver::open( std::string name ){
	logger.info( "ConsoleObserver::open");
	return true;
}	

void ConsoleObserver::close() const {
	logger.info( "ConsoleObserver::close" );
}
void ConsoleObserver::update(std::vector<ReadingPtr> readings){
	for (auto reading_it = readings.begin(); reading_it!=readings.end(); ++reading_it) {
		std::string value = std::to_string( (*reading_it)->getValue());
		logger.info( "ConsoleObserver::update Name: " + (*reading_it)->getName() + " value: " + value );

	}		
}

