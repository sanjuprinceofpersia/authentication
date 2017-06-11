authApp
.factory("httpInterceptor",["$log",function($log){
	var httpInterceptor = {};
	
	httpInterceptor.request = function(config){
		$log.info("request is being made to " + config.url);
		return config;
	};

	httpInterceptor.response = function(config){
		$log.info("request to URL : " + config.url + " is completed now.");
		return config;
	}
	
	return httpInterceptor;
}])
.config(["$httpProvider",function($httpProvider){
    // Http Interceptor - yeahhh
    $httpProvider.interceptors.push('httpInterceptor');

}]);