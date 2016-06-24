authApp.service("utils", function()
{

	var utils = {};
	
	utils.is_defined = function()
	{
		if(arguments.length === 0)
		{
			return false
		}
		else
		{
			var index = 0;
			while(index<arguments.length)
			{
				var param = arguments[index];				
				if(param === undefined || param === null) return false;
				index++;
			}
			return true;
		}
	};

	utils.is_not_defined = function()
	{
		return !this.is_defined.apply(null,arguments);
	};	

	utils.is_array = function()
	{

		if(arguments.length===0 )
			return false;
		if(this.is_not_defined.apply(null,arguments))
			return false;
		else
		{
			for(var index=0,length=arguments.length; index<length; index++)
			{
				var param = arguments[index];
				if(param.constructor.toString().indexOf("Array")) return false
			}
			return true;
		}	
	};

	utils.is_function = function()
	{
		if(arguments.length === 0)
		{
			return false
		}
		else
		{
			var index = 0;
			if(this.is_defined(arguments))
			{
				while(index<arguments.length)
				{
					var param = arguments[index];				
					if(typeof(param) != "function") 
						return false;
					index++;
				}
			}
			else
			{
				return false;
			}
			return true;
		}
	};

	utils.refresh_view = function(scope)
	{
		if(!scope.$$phase)
			scope.$apply();
	};

	return utils;
});