authApp.service("formUtils", function($http,$rootScope,utils)
{
	var service = {};

	service.resetForm = function(form,scope)
	{
		if(utils.is_defined(form) && utils.is_function(form.$setPristine,form.$setUntouched))
		{
			form.$setPristine();
			form.$setUntouched();
			if(utils.is_defined(scope))
				utils.refresh_view(scope);
		}
	};

	service.setFieldValidInvalid = function(field,error,setValid,scope)
	{
		if(utils.is_defined(field,error) && utils.is_function(field.$setValidity,field.$validate))
		{
			setValid = (utils.is_defined(setValid)) ? setValid : false;
			field.$setValidity(error,setValid);
			field.$validate();
			if(utils.is_defined(scope))
				utils.refresh_view(scope);
			$rootScope.$broadcast("setFocus",{});
		}
	};

	return service;
});