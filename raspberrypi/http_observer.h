#include <iostream>
#include "observer.h"
#include <curl/curl.h>
#include "configuration.h"
	
class HttpObserver : public Observer{
	private:
		CURL *curl;	
		CURLcode res;
		std::string serverBaseURL;
		
	public:
		HttpObserver( Configuration configuration);
		bool open( std::string name );
		void close() const;
		void update(std::vector<Reading*>);

};
