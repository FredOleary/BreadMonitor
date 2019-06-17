#include "json_wrapper.h"
#include "third_party/json.hpp"

JsonWrapper::JsonWrapper(){
	std::cout << "$$$$$$$$$$" << std::endl;
	jsonImpl = NULL;
	jsonImpl = static_cast<void*>(new nlohmann::json);
	
}
JsonWrapper::JsonWrapper(std::string jsonString){
	std::cout << "++++++++" << jsonString << std::endl;
	jsonImpl = NULL;
	auto jsonPtr = nlohmann::json::parse(jsonString.c_str());
	jsonImpl = static_cast<void*>(jsonPtr);
//	auto jsonPtr = new nlohmann::json;
//	jsonPtr->parse(jsonString.c_str());
//	jsonImpl = static_cast<void*>(jsonPtr);
	
}

JsonWrapper::~JsonWrapper(){
	if( jsonImpl != NULL){
		delete static_cast<nlohmann::json*>(jsonImpl);
	}
	
}

void JsonWrapper::addStringMember( std::string key, std::string value){
	auto jsonPtr = static_cast<nlohmann::json*>(jsonImpl);
	(*jsonPtr)[key.c_str()] = value;
}

void JsonWrapper::addDoubleMember( std::string key, double value ){
	auto jsonPtr = static_cast<nlohmann::json*>(jsonImpl);
	(*jsonPtr)[key.c_str()] = value;
}

std::string JsonWrapper::getJsonString(){
	auto jsonPtr = static_cast<nlohmann::json*>(jsonImpl);
	return jsonPtr->dump();
}

int JsonWrapper::getIntValue( std::string key ){
	auto jsonPtr = static_cast<nlohmann::json*>(jsonImpl);
	std::cout << "getIntValue()--------------" << (void*)jsonImpl << std::endl;
	
	std::cout << "=====" << (*jsonPtr)["id"].get<int>();
	
	return (*jsonPtr)[key.c_str()].get<int>();	
}
