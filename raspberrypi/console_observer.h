#include <iostream>
#include <memory>
#include "observer.h"
	
class ConsoleObserver : public Observer{
	public:
		bool open( std::string name );
		void close() const;
		void update(std::vector<ReadingPtr>);

};
