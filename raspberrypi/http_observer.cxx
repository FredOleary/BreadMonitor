#include <iostream>
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
		JsonWrapper wrapperRequest;
		wrapperRequest.addStringMember(std::string("name"), name);
		std::string test = wrapperRequest.getJsonString();
		std::cout << "TEST" << test << std::endl;
		
		std::string postResponse;		
		std::string data = "{\"name\":\"foo\"}";
		std::string url = serverBaseURL + "batches";
		
		curl_easy_setopt(curl, CURLOPT_URL, url.c_str());
		curl_easy_setopt(curl, CURLOPT_CUSTOMREQUEST, "POST");
		curl_easy_setopt(curl, CURLOPT_POSTFIELDSIZE, data.length());
		curl_easy_setopt(curl, CURLOPT_POSTFIELDS, data.c_str());
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, CurlWrite_CallbackFunc_StdString);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, &postResponse);
		
		res = curl_easy_perform(curl);
		if(res != CURLE_OK){
			std::cout << "curl_easy_perform() failed" << curl_easy_strerror(res) << std::endl;
			return false;
		}
		JsonWrapper wrapperResponse(postResponse);
		
		std::cout << "curl_easy_perform() succeeded: Response ID: " << wrapperResponse.getIntValue("id") << std::endl;
		return true;
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
void HttpObserver::update(std::vector<Reading*>){
	std::cout << "HttpObserver::update" << std::endl;
}

