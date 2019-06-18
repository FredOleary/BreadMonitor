#include <iostream>
#include <memory.h>
#include "console_observer.h"
	
	
	
bool ConsoleObserver::open( std::string name ){
	std::cout << "console_observer::open" << std::endl;
	return true;
}	

void ConsoleObserver::close() const {
	std::cout << "console_observer::close" << std::endl;
}
void ConsoleObserver::update(std::vector<ReadingPtr>){
	std::cout << "console_observer::update" << std::endl;
}

