#include <random>
#include "reading.h"

class CO2Reading : public Reading{
	
	private:
		std::mt19937 generator;
		std::uniform_int_distribution<int> distribution;
		double value;

	public:
		CO2Reading( int valueIn);
		~CO2Reading();
		std::string getName() const;
		double getValue();
};
