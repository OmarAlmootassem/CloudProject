'use strict';

// Declare app level module which depends on views, and components
angular.module('CloudApp', ['ngMaterial',
  'ngRoute',
  'CloudApp.data_representation',
  'CloudApp.tests',
  'CloudApp.version'
])

.config(function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/charts'});
})

.controller('MainCtrl', function($scope, $location){
	if ($location.path() == "/charts"){
		$scope.currentNavItem = 'charts';
	} else if ($location.path() == "/run_tests"){
		$scope.currentNavItem = "run_tests";
	}


	$scope.goTo = function(view){

		$location.path(view);
	}
});
