#include <iostream>
#include "observer.h"
	
class ConsoleObserver : public Observer{
	public:
		bool open( std::string name );
		void close() const;
		void update(std::vector<Reading*>);

};
