#include <iostream>
#include <memory>
#include "http_observer.h"
#include "json_wrapper.h"	

size_t CurlWrite_CallbackFunc_StdString(void *contents, size_t size, size_t nmemb, std::string *s)
{
    size_t newLength = size*nmemb;
    try
    {
        s->append((char*)contents, newLength);
    }
    catch(std::bad_alloc &e)
    {
        //handle memory problem
        return 0;
    }
    return newLength;
}
	
HttpObserver::HttpObserver( Logger& loggerIn, Configuration configuration ) : logger(loggerIn){
	curl = curl_easy_init();
	batchId = -1;
	if(curl != NULL) {
		logger.info("Successfully initialized curl");
		struct curl_slist *headers = NULL;
		headers = curl_slist_append(headers, "Accept: application/json");
		headers = curl_slist_append(headers, "Content-Type: application/json;charset=utf-8");		
		curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
		serverBaseURL = configuration.getServerURL();
		endDate= configuration.getEndTime();
	}
}	
bool HttpObserver::open( std::string name ){
	logger.info( "HttpObserver::open" );
	if(curl != NULL) {
		try{
			std::unique_ptr<JsonWrapper> wrapperRequest(JsonWrapper::Create());
			wrapperRequest->addStringMember(std::string("name"), name);
			wrapperRequest->addStringMember(std::string("endDate"), std::asctime( std::localtime(&endDate )));
			
			std::string postData = wrapperRequest->getJsonString();
			logger.info( std::string("HttpObserver::open - Batch: " + postData ) );
			
			std::string postResponse;		
			std::string url = serverBaseURL + "batches";
			
			curl_easy_setopt(curl, CURLOPT_URL, url.c_str());
			curl_easy_setopt(curl, CURLOPT_CUSTOMREQUEST, "POST");
			curl_easy_setopt(curl, CURLOPT_POSTFIELDSIZE, postData.length());
			curl_easy_setopt(curl, CURLOPT_POSTFIELDS, postData.c_str());
			curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, CurlWrite_CallbackFunc_StdString);
			curl_easy_setopt(curl, CURLOPT_WRITEDATA, &postResponse);
			
			res = curl_easy_perform(curl);
			if(res != CURLE_OK){
				logger.error( std::string("HttpObserver::update curl_easy_perform() failed") + std::string( curl_easy_strerror(res)) );
				return false;
			}
			std::unique_ptr<JsonWrapper> wrapperResponse(JsonWrapper::Create(postResponse));
			batchId = wrapperResponse->getIntValue("id");
			logger.info( std::string( "HttpObserver::update curl_easy_perform() succeeded: Response ID: ") + std::to_string( batchId ));
			return true;
		}catch( std::exception& ex ){
			logger.error(std::string( "HttpObserver::open - Open failed ") + ex.what() );
			return false;
		}
	}else{
		return false;
	}
}	

void HttpObserver::close() const {
	logger.info( "HttpObserver::close" );
	if(curl != NULL) {
		curl_easy_cleanup(curl);
	}
}
void HttpObserver::update(std::vector<ReadingPtr> readings){
	for (auto reading_it = readings.begin(); reading_it!=readings.end(); ++reading_it) {
		try{
			std::unique_ptr<JsonWrapper> wrapperRequest(JsonWrapper::Create());
			wrapperRequest->addIntMember(std::string("BatchId"), batchId);
			wrapperRequest->addDoubleMember(std::string((*reading_it)->getName()), (*reading_it)->getValue());
			std::string postData = wrapperRequest->getJsonString();
			logger.info( std::string( "HttpObserver::update ") + postData );

			std::string postResponse;		
			std::string url = serverBaseURL + "readings";		
			curl_easy_setopt(curl, CURLOPT_URL, url.c_str());
			curl_easy_setopt(curl, CURLOPT_CUSTOMREQUEST, "POST");
			curl_easy_setopt(curl, CURLOPT_POSTFIELDSIZE, postData.length());
			curl_easy_setopt(curl, CURLOPT_POSTFIELDS, postData.c_str());
			curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, CurlWrite_CallbackFunc_StdString);
			curl_easy_setopt(curl, CURLOPT_WRITEDATA, &postResponse);
			
			res = curl_easy_perform(curl);
			if(res != CURLE_OK){
				logger.error( std::string("HttpObserver::update- curl_easy_perform() failed ") + std::string(curl_easy_strerror(res)));		
			}
		}catch( std::exception& ex ){
			logger.error( std::string("HttpObserver::update- failed ") + ex.what());		
		}
	}		
}

