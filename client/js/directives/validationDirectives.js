
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
				if(utils.is_defined(username) && username.length > 4)
				{
					scope.credential_creation_guidelines[0].is_followed = true;
				}
				else
				{
					scope.credential_creation_guidelines[0].is_followed = false;	
				}
				return true;
			};

			ctrl.$validators.valid_username = validate_username;
		}
	}
});
