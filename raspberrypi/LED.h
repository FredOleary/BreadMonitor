#include <wiringPi.h>


class LED {
	private:
		int LEDPin;
	
	public:
		LED(){
			LEDPin = 0;
			pinMode( LEDPin, OUTPUT);
		}
		void turnON(){
			digitalWrite( LEDPin, 1);
		}
		void turnOFF(){
			digitalWrite( LEDPin, 0);
		}
};
