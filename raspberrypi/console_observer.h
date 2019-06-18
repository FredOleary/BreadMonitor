#include <iostream>
#include <memory>
#include "observer.h"
#include "logger.h"
	
class ConsoleObserver : public Observer{
	private:
		Logger& logger;
	public:
		ConsoleObserver( Logger& logger );
		bool open( std::string name );
		void close() const;
		void update(std::vector<ReadingPtr>);

};
