#include <iostream>

class JsonWrapper{
	
	public:
		virtual ~JsonWrapper();
		virtual void addStringMember( std::string key, std::string value) = 0;
		virtual void addDoubleMember( std::string key, double value ) = 0;
		virtual void addIntMember( std::string key, int value ) = 0;
		virtual std::string getJsonString() = 0;
		virtual int getIntValue( std::string key ) = 0;
		
		static JsonWrapper* Create();
		static JsonWrapper* Create(std::string jsonString);
		
	protected:
		JsonWrapper();
};

