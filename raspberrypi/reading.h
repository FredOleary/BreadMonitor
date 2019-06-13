
#pragma once

class Reading{
	public:
	virtual ~Reading() {};
	virtual std::string getName() const = 0;
	virtual double getValue() const = 0;
};
