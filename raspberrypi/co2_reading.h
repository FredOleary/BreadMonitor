#include "reading.h"

class CO2Reading : public Reading{
	public:
		~CO2Reading();
		std::string getName() const;
		double getValue();
};
