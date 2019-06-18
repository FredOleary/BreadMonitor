#include <iostream>
#include "sensor.h"
	
class CO2Sensor : public Sensor{
	public:
		bool open( std::string name );
		void close();
		std::vector<ReadingPtr> getReading();

};
