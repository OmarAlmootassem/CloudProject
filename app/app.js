'use strict';

// Declare app level module which depends on views, and components
angular.module('CloudApp', ['ngMaterial', 'md-steppers',
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
	$scope.$on('$locationChangeStart', function(event){
		$scope.currentNavItem = $location.path().substring(1);
	});


	$scope.goTo = function(view){

		$location.path(view);
	}
});
