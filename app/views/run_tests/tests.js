'use strict';

angular.module('CloudApp.tests', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/run_tests', {
    templateUrl: 'views/run_tests/view.html',
    controller: 'TestsCtrl'
  });
}])

.controller('TestsCtrl', function($scope) {
	$scope.step1 = {
		completed: false,
		disabled: false
	};
	$scope.step2 = {
		completed: false,
		disabled: true
	};
	$scope.step3 = {
		completed: false,
		disabled: true
	};

	$scope.tests = [
		{
			group: "Upload",
			label: "Upload Small Amount of Data"
		},
		{
			group: "Upload",
			label: "Upload Large Amount of Data"
		},
		{
			group: "Download",
			label: "Retrieve Small Amount of Data"
		},
		{
			group: "Download",
			label: "Retrieve Large Amount of Data"
		}
	];

	$scope.selectedTest = {};
});