#pragma once
#include <iostream>
#include <ctime>
	
class Configuration {
	private:
		std::time_t startTime;
		std::time_t endTime;
		std::string name;
		int durationInHours;
	
	public:
		Configuration();
		std::time_t getStartTime() const;
		std::time_t getEndTime() const;
		std::string getName() const;
		
		void setName( std::string name );
		void setDuration( int hoursInDurationIn );
};

