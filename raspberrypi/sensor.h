
#pragma once
#include <vector>
#include "reading.h"

class Sensor{
	public:
	virtual ~Sensor() {};
	virtual bool open(std::string name) = 0;
	virtual void close() = 0;
	virtual std::vector<ReadingPtr> getReading() = 0;
};
