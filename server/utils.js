var exports = module.exports = {};

var utilityFunctions = function()
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
	}

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
		
	}
	return utils;
}

exports.utils = utilityFunctions();