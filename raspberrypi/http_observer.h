#include <iostream>
#include <ctime>
#include "observer.h"
#include <curl/curl.h>
#include "configuration.h"
#include "logger.h"
	
class HttpObserver : public Observer{
	private:
		Logger& logger;
		CURL *curl;	
		CURLcode res;
		std::string serverBaseURL;
		std::time_t endDate;
		int batchId;
		
	public:
		HttpObserver( Logger& loggerIn, Configuration configuration );
		bool open( std::string name );
		void close() const;
		void update(std::vector<ReadingPtr>);

};
