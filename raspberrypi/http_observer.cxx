#include <iostream>
#include "http_observer.h"
	
	
	
bool HttpObserver::open( std::string name ){
	std::cout << "HttpObserver::open" << std::endl;
	return true;
}	

void HttpObserver::close() const {
	std::cout << "HttpObserver::close" << std::endl;
}
void HttpObserver::update(){
	std::cout << "HttpObserver::update" << std::endl;
}

