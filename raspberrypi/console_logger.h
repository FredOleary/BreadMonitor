#include <iostream>
#include "logger.h"

class ConsoleLogger : public Logger {
	public:
	virtual ~ConsoleLogger();
	void error(std::string message);
	virtual void warning(std::string message);
	virtual void info(std::string message);
};
