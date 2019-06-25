#include <random>
#include "reading.h"

class CO2Reading : public Reading{
	
	private:
		std::mt19937 generator;
		std::uniform_int_distribution<int> distribution;

	public:
		CO2Reading();
		~CO2Reading();
		std::string getName() const;
		double getValue();
};
