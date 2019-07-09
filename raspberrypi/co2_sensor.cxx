#include <iostream>
#include <memory>
#include <chrono>
#include <thread>
#include <wiringSerial.h>
#include "co2_sensor.h"
#include "co2_reading.h"	


CO2Sensor::CO2Sensor( Logger& loggerIn) : logger(loggerIn){
	serialFd	= -1;
	baudRate = 9600;
	serialPort = "/dev/serial0";
}	
	
bool CO2Sensor::open( std::string name ){
	logger.info("CO2Sensor::open");
	serialFd = serialOpen (serialPort.c_str(), baudRate) ;
	if( serialFd != -1 ){	
		serialFlush (serialFd) ;
		logger.info("CO2Sensor::open serial port: " + std::to_string(serialFd));
		return true;
	}else{
		return false;
	}
}	

void CO2Sensor::close() {
	logger.info( "CO2Sensor::close");
	if( serialFd != -1 ){
		serialClose( serialFd );
		serialFd = -1;
	}
}
std::vector<ReadingPtr> CO2Sensor::getReading(){
	logger.info( "CO2Sensor::getReading" );
	std::vector<ReadingPtr> co2ReadingList;
	serialFlush (serialFd) ;
	sendCommand();
	std::this_thread::sleep_for(std::chrono::milliseconds(500));
	int co2Value;
	bool success = getResponse( &co2Value );
	if( ! success ){
		return co2ReadingList;
	}
		
	ReadingPtr reading (new CO2Reading(co2Value));
	co2ReadingList.push_back( reading );
	return co2ReadingList;
}

void CO2Sensor::sendCommand(){
//	std::string controlStr = "\xFE\x44\x00\x08\x02\x9F\x25";
	serialPutchar( serialFd, '\xFE' );
	serialPutchar( serialFd, '\x44' );
	serialPutchar( serialFd, '\x00' );
	serialPutchar( serialFd, '\x08' );
	serialPutchar( serialFd, '\x02' );
	serialPutchar( serialFd, '\x9F' );
	serialPutchar( serialFd, '\x25' );

}

bool CO2Sensor::getResponse( int* responseValue ){
	int responseBuffer[10];
	*responseValue = -1;
	for( int i = 0; i < 7; i++ ){
		int response = serialGetchar (serialFd);
		if( response == -1 ){	// Failed to read
			logger.error("CO2Sensor::getReading faid to read...index:" + std::to_string(i));
			return false;
		}
		responseBuffer[i] = response;
	}
	*responseValue = responseBuffer[3] * 256 + responseBuffer[4];
	return true;
}
