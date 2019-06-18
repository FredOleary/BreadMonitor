#pragma once
#include <iostream>
#include <memory>

class Reading{
	public:
	virtual ~Reading() {};
	virtual std::string getName() const = 0;
	virtual double getValue() = 0;
};

using ReadingPtr = std::shared_ptr<Reading>;


