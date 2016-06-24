authApp.controller("registerationController", function($scope,$rootScope,$state,utils,formUtils,validationService){
	var rgCtrl = $scope;
	rgCtrl.credentials = {};
	rgCtrl.activeField = {};

	rgCtrl.showGuidelines = function(elem)
	{
		if(utils.is_defined(elem) && utils.is_defined(elem.$name))
		{
			switch(elem.$name)
			{
				case "username":
					rgCtrl.guidelines_title = $rootScope.$$constants.username_guidelines_title;
					break;
				case "password":
					rgCtrl.guidelines_title = $rootScope.$$constants.password_guidelines_title;
					break;
				case "password_dup":
					rgCtrl.guidelines_title = $rootScope.$$constants.password_guidelines_title;
					break;
				default:
					rgCtrl.guidelines_title = $rootScope.$$constants.username_guidelines_title;
			}
			rgCtrl.credential_creation_guidelines = validationService.getUserCreationGuidelines(elem.$name);
		}
		else
		{
			rgCtrl.guidelines_title = $rootScope.$$constants.username_guidelines_title;
			rgCtrl.credential_creation_guidelines = validationService.getUserCreationGuidelines();
		}
	};

	rgCtrl.init = function()
	{
		rgCtrl.showGuidelines();
	};

});