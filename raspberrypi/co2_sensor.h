#include <iostream>
#include "sensor.h"
#include "logger.h"
	
class CO2Sensor : public Sensor{
	private:
		int serialFd;
		int baudRate;
		std::string serialPort;
		Logger& logger;
		
		void sendCommand();
		bool getResponse( int* responseValue );
		
	public:
		CO2Sensor(Logger& logger);
		bool open( std::string name );
		void close();
		std::vector<ReadingPtr> getReading();

};
