authApp.controller("notificationsController",function($scope,$rootScope,utils){
	var nCtrl = $scope;
	nCtrl.showNotification = false;
	nCtrl.type="success";

	$rootScope.$on("showNotification", function(event,data){
		if(utils.is_defined(data) && data.type==="error")
			nCtrl.type="error";
		nCtrl.showNotification = true;
		setTimeout(function(){
			nCtrl.showNotification = false;
			nCtrl.type="success";
			if(!nCtrl.$$phase)
				nCtrl.$apply();
		},5000);
	});

});