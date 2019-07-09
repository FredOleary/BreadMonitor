#include "utility.h"

std::string stripTimeLinefeed( std::string message ){
	return message.substr(0, message.length()-1);
}
