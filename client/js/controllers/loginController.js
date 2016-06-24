authApp.controller("loginController",function($scope,$rootScope,$state,utils,formUtils,validationService)
{
	
	var lgCtrl = $scope;
	
	lgCtrl.credentials = {};
	lgCtrl.invalid_username = true;

	lgCtrl.submitCredentials = function()
	{
		if(lgCtrl.loginForm.$valid)
		{
			validationService.validateUsername(lgCtrl.credentials).then(function(data){
				if(utils.is_defined(data.username))
				{
					if(data.username.is_valid)
					{
						lgCtrl.invalid_username = false;
						formUtils.resetForm(lgCtrl.loginForm,lgCtrl);
						$('form').find('input').focus();
					}
					else
						formUtils.setFieldValidInvalid(lgCtrl.loginForm.username,'invalid_username',false,lgCtrl);
				}
				else if(utils.is_defined(data.password))
				{
					if(data.password.is_valid)
						$state.go('dashboard',{username:lgCtrl.credentials.username});
					else
						formUtils.setFieldValidInvalid(lgCtrl.loginForm.password,'invalid_password',false,lgCtrl);
				}
			});
		}
	};

	$(document).ready(function()
	{
		setTimeout(function(){
			$('form').find('input').focus();	
		},100);
	});
	
});