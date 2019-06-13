
#pragma once

class Observer{
	public:
	virtual ~Observer() {};
	virtual bool open(std::string name) = 0;
	virtual void close() const = 0;
	virtual void update() = 0;
};
