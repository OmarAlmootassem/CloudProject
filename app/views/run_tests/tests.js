'use strict';

angular.module('CloudApp.tests', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/run_tests', {
    templateUrl: 'views/run_tests/view.html',
    controller: 'TestsCtrl'
  });
}])

.controller('TestsCtrl', function($scope, $mdToast) {
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

	$scope.databases = [
		{
			name: "MongoDB",
			avatar: "http://d2kv389z282s26.cloudfront.net/wp-content/blogs.dir/1/files/2015/01/MongoDB_Logo.png",
			selected: false
		},
		{
			name: "HBase",
			avatar: "https://svn.apache.org/repos/asf/hbase/hbase.apache.org/trunk/images/big_h_logo.svg",
			selected: false
		},
		{
			name: "DynamoDB",
			avatar: "https://cdn.worldvectorlogo.com/logos/aws-dynamodb.svg",
			selected: false
		},
		{
			name: "Cassandra",
			avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Cassandra_logo.svg/800px-Cassandra_logo.svg.png",
			selected: false
		},
		{
			name: "Firebase",
			avatar: "https://lh3.googleusercontent.com/-whXBCDVxIto/Vz2Rsyz-UjI/AAAAAAAAiJc/UjvR-M2b9tY5SyKFkDY6Q_MbusEINRXkQ/w1024-h1024/Firebase_16-logo.png",
			selected: false
		}
	];

	$scope.testChosen = function(test){
		console.log(test);
		$scope.error = false;
		$scope.step1.completed = true;
		$scope.step2.disabled = false;
		$scope.selectedStep = 1;
	}

	$scope.databasesChosen = function(databases){
		console.log(databases);
		var selected = false;
		for(var i = 0; i < $scope.databases.length; i++){
			if ($scope.databases[i].selected){
				selected = true;
			}
		}

		if (selected){
			$scope.error = false;
			$scope.step2.completed = true;
			$scope.step3.disabled = false;
			$scope.selectedStep = 2;
		} else {
			$scope.error = true;
			$mdToast.show(
			$mdToast.simple()
			  .textContent('Please Select At Least 1 Database')
			  .hideDelay(5000)
			);
		}
	}
});