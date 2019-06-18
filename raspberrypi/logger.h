#pragma once
#include "logger.h"

class Logger{
	public:
	virtual ~Logger(){};
	virtual void error(std::string name) = 0;
	virtual void warning(std::string name) = 0;
	virtual void info(std::string name) = 0;
};

