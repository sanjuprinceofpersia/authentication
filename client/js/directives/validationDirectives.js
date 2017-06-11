authApp

.directive("setFocus",function($rootScope,utils)
{
	return {
		restrict : 'A',
		link : function(scope,elem,attr,ctrl)
		{
			var setFocus = function()
			{
				var err_elem = $("input.input_error").first();

				if(utils.is_defined(err_elem))
					err_elem.focus();
			}

			elem.on("submit", setFocus);
			$rootScope.$on("setFocus",setFocus);
		}
	}
})

.directive("resetField",function($rootScope,utils)
{
	return {
		restrict:"A",
		scope : {field : '='},
		link : function(scope,elem,attr,ctrl)
		{
			var resetField = function()
			{
				if(utils.is_defined(scope.field))
				{
					for(validator in scope.field.$error)
						scope.field.$setValidity(validator,true); //To resetting the error for the field
					scope.field.$setPristine();
					scope.field.$setUntouched();
				}
			};

			elem.on("keydown",resetField);
		}
	}
})

.directive("restrictInvalidInput", function($rootScope,utils){
	return {
		restrict : "A",
		require:"ngModel",
		priority:1,
		link : function(scope,elem,attr,ctrl)
		{
				var remove_invalid_chars = function()
				{
					var username = ctrl.$viewValue;
					username = username.toLowerCase();
					var username_invalid_chars = /[^\w_]/g;
					username = username.replace(username_invalid_chars,"");
					var username_temp = username.split("_");
					if(utils.is_defined(username_temp) && username_temp.length)
					{
						if(username_temp.length>2)
						{
							username = username_temp[0] + "_" + username_temp[1].replace("/_/g","");
						}
					}
					ctrl.$setViewValue(username);
					ctrl.$render();
					return username;
				};

				ctrl.$parsers.push(remove_invalid_chars);
		}
	}
})

.directive("validateUsername", function($rootScope,utils){
	return {
		restrict : "A",
		require:"ngModel",
		priority:2,
		link : function(scope,elem,attr,ctrl)
		{

			var validate_username = function(modelValue , viewValue)
			{
				var username = modelValue || viewValue;
				if(utils.is_defined(username))
				{
					//Min length
					if(username.length > 3) scope.credential_creation_guidelines[0].is_followed = true;
					else scope.credential_creation_guidelines[0].is_followed = false;
					//Max length
					if(username.length > 3 && username.length < 13) scope.credential_creation_guidelines[1].is_followed = true;
					else scope.credential_creation_guidelines[1].is_followed = false;
					//First Character as alphabet
					if(/^[a-z]/.test(username)) scope.credential_creation_guidelines[2].is_followed = true;
					else scope.credential_creation_guidelines[2].is_followed = false;
					//alphanumric -- enforced via parser and will always be true
					if((username.length == 1 && /^[a-z]/.test(username)) || username.length > 1) scope.credential_creation_guidelines[3].is_followed = true;
					else scope.credential_creation_guidelines[3].is_followed = false;
				}
				for(var i=0, len = scope.credential_creation_guidelines.length;i<len;i++)
				{
					if(!scope.credential_creation_guidelines[i].is_followed)
						return false;
				}
				return true;
			};

			ctrl.$validators.valid_username = validate_username;
		}
	}
})

.directive("validatePassword", function($rootScope,utils){
	return {
		restrict : "A",
		require:"ngModel",
		priority:2,
		link : function(scope,elem,attr,ctrl)
		{

			var validate_password = function(modelValue , viewValue)
			{
				var password = modelValue || viewValue;
				if(utils.is_defined(password))
				{
					//Min length
					if(password.length > 3) scope.credential_creation_guidelines[0].is_followed = true;
					else scope.credential_creation_guidelines[0].is_followed = false;
					//Max length
					if(password.length > 3 && password.length < 13) scope.credential_creation_guidelines[1].is_followed = true;
					else scope.credential_creation_guidelines[1].is_followed = false;
					//alphanumric -- enforced via parser and will always be true
					if((password.length == 1 && /^[a-z]/.test(password)) || password.length > 1) scope.credential_creation_guidelines[2].is_followed = true;
					else scope.credential_creation_guidelines[2].is_followed = false;
					// Atleast one number
					if(/\d/.test(password)) scope.credential_creation_guidelines[3].is_followed = true;
					else scope.credential_creation_guidelines[3].is_followed = false;
					// Special char existance
					if(/_/.test(password)) scope.credential_creation_guidelines[4].is_followed = true;
					else scope.credential_creation_guidelines[4].is_followed = false;
				}
				for(var i=0, len = scope.credential_creation_guidelines.length;i<len;i++)
				{
					if(!scope.credential_creation_guidelines[i].is_followed)
						return false;
				}
				return true;
			};

			ctrl.$validators.valid_password = validate_password;
		}
	}
})
.directive("validatePasswordDuplicate", function($rootScope,utils){
	return {
		restrict : "A",
		require:"ngModel",
		priority:2,
		link : function(scope,elem,attr,ctrl)
		{

			var validate_duplicate_password = function(modelValue , viewValue)
			{
				var password = modelValue || viewValue;
				if(utils.is_defined(password))
				{
					//Validate Replica
					if(password === scope.credentials.password) scope.credential_creation_guidelines[0].is_followed = true;
					else scope.credential_creation_guidelines[0].is_followed = false;
				}
				for(var i=0, len = scope.credential_creation_guidelines.length;i<len;i++)
				{
					if(!scope.credential_creation_guidelines[i].is_followed)
						return false;
				}
				return true;
			};

			ctrl.$validators.valid_duplicate_password = validate_duplicate_password;
		}
	}
})

.directive("testscope",function(){

	var my_controller = function($scope){
		//todo
	}

	var my_link = function(scope,elem,attr,modelCtrl){
		var my_parser = function(value){
			debugger;
			return value;
		}

		var my_formatter = function(value){
			debugger;
			return value;
		}

		modelCtrl.$parsers.push(my_parser);
		modelCtrl.$formatters.push(my_formatter);

	}

	return{
		restrict : "A",
		require: "ngModel",
		controller: my_controller,
		link: my_link
	}
})