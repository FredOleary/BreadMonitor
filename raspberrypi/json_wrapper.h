#include <iostream>

class JsonWrapper{
	private:
		void* jsonImpl;
	
	public:
		JsonWrapper();
		JsonWrapper( std::string jsonString );
		~JsonWrapper();
		void addStringMember( std::string key, std::string value);
		void addDoubleMember( std::string key, double value );
		std::string getJsonString();
		int getIntValue( std::string key );
};
