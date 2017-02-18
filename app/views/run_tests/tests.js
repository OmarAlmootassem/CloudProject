'use strict';

angular.module('CloudApp.tests', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/run_tests', {
    templateUrl: 'views/run_tests/view.html',
    controller: 'TestsCtrl'
  });
}])

.controller('TestsCtrl', function($scope) {
	$scope.selectedStep = 0;
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

	$scope.testToRun = 0;
	$scope.tests = [
		{
			id: 0,
			label: "Upload Small Amount of Data"
		},
		{
			id: 1,
			label: "Upload Large Amount of Data"
		},
		{
			id: 2,
			label: "Retrieve Small Amount of Data"
		},
		{
			id: 3,
			label: "Retrieve Large Amount of Data"
		},
		{
			id: 4,
			label: "Update Small Amount of Data"
		},
		{
			id: 5,
			label: "Update Large Amount of Data"
		}
	];

	$scope.testChosen = function(test){
		console.log(test);
		$scope.step1.completed = true;
		$scope.step2.disabled = false;
		$scope.selectedStep = 1;
	}
});