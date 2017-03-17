'use strict';

angular.module('CloudApp.tests', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/run_tests', {
    templateUrl: 'views/run_tests/view.html',
    controller: 'TestsCtrl'
  });
}])

.controller('TestsCtrl', function($scope, $http, $mdToast) {
	var ipInfo;
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

	$scope.tests = [
		{
			id: 0,
			label: "Upload Small Amount of Data",
			selected: false
		},
		{
			id: 1,
			label: "Upload Large Amount of Data",
			selected: false
		},
		{
			id: 2,
			label: "Retrieve Small Amount of Data",
			selected: false
		},
		{
			id: 3,
			label: "Retrieve Large Amount of Data",
			selected: false
		},
		{
			id: 4,
			label: "Update Small Amount of Data",
			selected: false
		},
		{
			id: 5,
			label: "Update Large Amount of Data",
			selected: false
		}
	];

	$scope.databases = [
		{
			name: "MongoDB",
			avatar: "/img/db/mongo.png",
			selected: false
		},
		{
			name: "HBase",
			avatar: "/img/db/hbase.svg",
			selected: false
		},
		{
			name: "DynamoDB",
			avatar: "/img/db/dynamodb.svg",
			selected: false
		},
		{
			name: "Cassandra",
			avatar: "/img/db/cassandra.png",
			selected: false
		},
		{
			name: "Firebase",
			avatar: "/img/db/firebase.png",
			selected: false
		}
	];
	$scope.testToRun = 0;

	getIpAddressInfo();

	$scope.testChosen = function(test){
		$scope.tests[test].selected = true;
		console.log($scope.tests[test].label);

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

			switch(getSelectedTest().id){
				case 0: //Upload Small Data
					getDataFromFirebase("small");
					break;
				case 1:
					getDataFromFirebase("large");
					break;
				case 2:
					break;
				case 3:
					break;
				case 4:
					break;
				case 5:
					break;
				default:
					break;
			}
		} else {
			$scope.error = true;
			$mdToast.show(
			$mdToast.simple()
			  .textContent('Please Select At Least 1 Database')
			  .hideDelay(5000)
			);
		}
	}

	$scope.startTest = function(){
		var test = getSelectedTest();
		for (var i = $scope.databases.length - 1; i >= 0; i--) {
			if($scope.databases[i].selected){
				runTest($scope.databases[i]);
			}
		}
	}

	function getSelectedTest(){
		for (var i = $scope.tests.length - 1; i >= 0; i--) {
			if($scope.tests[i].selected)
				return $scope.tests[i];
		}
	}

	function getDataFromFirebase(size){
		firebase.storage().ref('test_files/' + size + '.json').getDownloadURL().then(function(url){
			console.log(url);
			$http.get(url).then(function(data){
				console.log(data);
				$scope.data = JSON.stringify(data.data, null, 4);
			});
		}).catch(function(error){
			console.error(error.code + ": " + error.message);
		});
	}

	function runTest(db){
		if (db.name == "Firebase"){
			start();
			$scope.message = "Pushing data to Firebase NoSQL Database...";
			firebase.database().ref("data/" + JSON.parse($scope.data).data_type).set(JSON.parse($scope.data), function(error){
				if (error){console.error(error.code + ": " + error.message);} else {
                	stop();
                	saveResults(db, JSON.parse($scope.data).data_type);
				}
			});
		} else if (db.name == "DynamoDB"){

		} else if (db.name = "MongoDB"){
			start();
			$http({
				url: "https://us-central1-nosql-db-comparison.cloudfunctions.net/PostToMongo",
				method: 'POST',
				data: $scope.data,
				headers: {'Content-Type': 'application/json'}
			}).success(function(data){
				stop();
				console.log(data);
			}).error(function(error){
				stop();
				console.error(error);
			})
		}
	}

	function getIpAddressInfo(){
		$http.get('http://ip-api.com/json/').then(function(data){
			console.log(data);
			ipInfo = data.data;
		});
	}

	function saveResults(db, type){
		firebase.database().ref('test_history/' + db.name.toLowerCase() + '/' + type).push({
			ip: ipInfo,
			time_ms: $scope.time
		});
	}

	$scope.$on('timer-stopped', function (event, data){
		console.log(data);
		$scope.time = data.millis;
	});

	function start(){
		$scope.$broadcast('timer-reset');
		$scope.$broadcast('timer-start');
		$scope.running = true;
		$scope.message = "Starting test...";
	}

	function stop(){
		$scope.$broadcast('timer-stop');
		$scope.running = false;
		$scope.message = "Finished test...";
	}

	$scope.editDB = function(){
		$scope.selectedStep = 1;
		$scope.step3.disabled = true;
	}

	$scope.changeTest = function(){
		$scope.selectedStep = 0;
		$scope.step3.disabled = true;
	}
});