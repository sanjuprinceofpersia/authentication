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
	};

	services.getUserCreationGuidelines = function(field)
	{
		var username_creation_guidelines = [
			$rootScope.$$constants.constraints_username_password_min_length,
			$rootScope.$$constants.constraints_username_password_max_length,
			$rootScope.$$constants.constraints_username_start,
			$rootScope.$$constants.constraints_username_password_valid_characters
		];

		var password_creation_guidelines = [
			$rootScope.$$constants.constraints_username_password_min_length,
			$rootScope.$$constants.constraints_username_password_max_length,
			$rootScope.$$constants.constraints_username_password_valid_characters,
			$rootScope.$$constants.constraints_password_number,
			$rootScope.$$constants.constraints_password_special_char
		];

		var password_dup_creation_guidelines = [
			$rootScope.$$constants.constraints_password_dup_identical
		];

		this.username_creation_guidelines = (utils.is_defined(this.username_creation_guidelines)) ? this.username_creation_guidelines : createGuidelinesObject(username_creation_guidelines);
		this.password_creation_guidelines = (utils.is_defined(this.password_creation_guidelines)) ? this.password_creation_guidelines : createGuidelinesObject(password_creation_guidelines);
		this.password_dup_creation_guidelines = (utils.is_defined(this.password_dup_creation_guidelines)) ? this.password_dup_creation_guidelines : createGuidelinesObject(password_dup_creation_guidelines);

		switch(field)
		{
			case "username":
				return this.username_creation_guidelines;
			case "password":
				return this.password_creation_guidelines;
			case "password_dup":
				return this.password_dup_creation_guidelines;
			default:
				return this.username_creation_guidelines;
		}
	};

	services.validateUsername = function(data)
	{
		var validatedUsername = new Promise(function(resolve,reject){
			$http({
				method: 'POST',
				url: "/validate_credentails",
				data:  new RequestModel(data),
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

	services.createUser = function(data)
	{
		var userCreated = new Promise(function(resolve,reject){
			$http({
				method: 'POST',
				url: '/create_user',
				data: new RequestModel(data),
				headers: {
			        "Content-Type": "application/json"
			    }
			}).then(function(response){
				resolve(response.data);
			}, function(response){
				reject(response.data);
			})
		});

		return userCreated;
	};

	return services;
});