#include <iostream>
#include "observer.h"
	
class HttpObserver : public Observer{
	public:
		bool open( std::string name );
		void close() const;
		void update();

};
