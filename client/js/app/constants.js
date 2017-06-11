authApp.constant("$$constants",{
	"__dirname" : location.protocol + "//" + location.hostname + ":" + location.port + "/",
    "regestiration_title" : "Welcome User<br/>Enter the details required to get you started",
    "username_guidelines_title" : "Username must satisfy conditions mentioned below",
    "password_guidelines_title" : "Password must satisfy conditions mentioned below",
    "constraints_username_password_min_length" : "length should be atleast 4",
    "constraints_username_password_max_length" : "length should be atmost 12",
    "constraints_username_password_invalid_characters" : "only underscore is allowed as special character",
    "constraints_username_password_valid_characters" : "should be alphanumeric",
    "constraints_username_unique" : "should be unique",
    "constraints_username_start" : "should start with character",
    "constraints_password_number" : "should have atleast one number",
    "constraints_password_special_char" : "should have one special character",
    "constraints_password_dup_identical" : "should be identical to password provided"
})
.run(function($rootScope, $$constants, $sce){
	$rootScope.$$constants = $$constants;
	for(constant in $rootScope.$$constants)
	{
		var regex = new RegExp(/</g); //To check for an html snippet
		if(regex.test($rootScope.$$constants[constant]))
			$rootScope.$$constants[constant] = $sce.trustAsHtml($rootScope.$$constants[constant]);
	}
});