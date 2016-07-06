(function (angular) {
	'use strict';

    var myapp =	angular.module('app',['ngRoute','app.contorllers.main']);
	myapp.config(['$routeProvider',function ($routeProvider) {
		$routeProvider
			.when('/:status?',{
			controller:'MainController',
			templateUrl:'main_templ'
			})
	}]);


})(angular);
