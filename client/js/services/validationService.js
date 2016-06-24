authApp.service("validationService", function($rootScope,$http,utils)
{
	var services = {};

	var RequestModel = function(user)
	{
		if(utils.is_defined(user.username))
			this.username = user.username;
		if(utils.is_defined(user.password))
			this.password = user.password;
	};

	var createGuidelinesObject = function(guidelinesArray)
	{
		var guidelines = [];
		for(index in guidelinesArray)
		{
			var guideline = {
				"guideline" : guidelinesArray[index],
				"is_followed" : false
			}
			guidelines.push(guideline);
		}
		guidelinesArray.splice(0);
		return guidelines;
	}

	services.getUserCreationGuidelines = function(field){
		var username_creation_guidelines = [
			$rootScope.$$constants.constraints_username_password_min_length,
			$rootScope.$$constants.constraints_username_password_max_length,
			$rootScope.$$constants.constraints_username_start,
			$rootScope.$$constants.constraints_username_password_valid_characters,
			$rootScope.$$constants.constraints_username_password_invalid_characters
		];

		var password_creation_guidelines = [
			$rootScope.$$constants.constraints_username_password_min_length,
			$rootScope.$$constants.constraints_username_password_max_length,
			$rootScope.$$constants.constraints_username_password_valid_characters
		];

		var password_dup_creation_guidelines = [
			$rootScope.$$constants.constraints_password_dup_identical
		];



		switch(field)
		{
			case "username":
				return createGuidelinesObject(username_creation_guidelines);;
			case "password":
				return createGuidelinesObject(password_creation_guidelines);;
			case "password_dup":
				return createGuidelinesObject(password_dup_creation_guidelines);;
			default:
				return createGuidelinesObject(username_creation_guidelines);;
		}
	};

	services.validateUsername = function(data)
	{
		var validatedUsername = new Promise(function(resolve,reject){
			$http({
				method: 'POST',
				data : new RequestModel(data),
				url: "/validate_credentails",
				headers: {
			        "Content-Type": "application/json"
			    }
			}).then(function(response){
				resolve(response.data);
			}, function(error){
				reject(error.error);
			})
		});

		return validatedUsername;
	};

	return services;
});