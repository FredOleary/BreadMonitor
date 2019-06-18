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
	
HttpObserver::HttpObserver( Configuration configuration ){
	curl = curl_easy_init();
	batchId = -1;
	if(curl != NULL) {
		std::cout << "Successfully initialized curl" << std::endl;		
		struct curl_slist *headers = NULL;
		headers = curl_slist_append(headers, "Accept: application/json");
		headers = curl_slist_append(headers, "Content-Type: application/json;charset=utf-8");		
		curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
		serverBaseURL = configuration.getServerURL();
	}
}	
bool HttpObserver::open( std::string name ){
	std::cout << "HttpObserver::open" << std::endl;
	if(curl != NULL) {
		try{
			std::unique_ptr<JsonWrapper> wrapperRequest(JsonWrapper::Create());
			wrapperRequest->addStringMember(std::string("name"), name);
			std::string postData = wrapperRequest->getJsonString();
			std::cout << "TEST" << postData		 << std::endl;
			
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
				std::cout << "curl_easy_perform() failed" << curl_easy_strerror(res) << std::endl;
				return false;
			}
			std::unique_ptr<JsonWrapper> wrapperResponse(JsonWrapper::Create(postResponse));
			batchId = wrapperResponse->getIntValue("id");
			std::cout << "curl_easy_perform() succeeded: Response ID: " << batchId << std::endl;
			return true;
		}catch( std::exception& ex ){
			std::cout << "Open failed " << ex.what() << std::endl;
			return false;
		}
	}else{
		return false;
	}
}	

void HttpObserver::close() const {
	std::cout << "HttpObserver::close" << std::endl;
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
			std::cout << "HttpObserver::update " << postData << std::endl;

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
				std::cout << "curl_easy_perform() failed" << curl_easy_strerror(res) << std::endl;
			}
		}catch( std::exception& ex ){
			std::cout << "Update failed " << ex.what() << std::endl;			
		}
	}		
}

