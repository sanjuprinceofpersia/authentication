authApp.config(function($stateProvider, $urlRouterProvider){
	$stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.tmpl'
        })
        .state('register',{
            url: '/register',
            templateUrl : 'templates/register.tmpl'
        })
        .state('dashboard', {
            url: '/dashboard/:username',
            templateUrl: 'templates/dashboard.tmpl'
        });

    $urlRouterProvider.otherwise('/login');
});