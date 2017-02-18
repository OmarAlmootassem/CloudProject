'use strict';

angular.module('CloudApp.data_representation', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/charts', {
    templateUrl: 'views/data_representation/view.html',
    controller: 'ChartsCtrl'
  });
}])

.controller('ChartsCtrl', [function() {

}]);