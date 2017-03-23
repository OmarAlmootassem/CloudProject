'use strict';

angular.module('CloudApp.tests', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/run_tests', {
    templateUrl: 'views/run_tests/view.html',
    controller: 'TestsCtrl'
  });
}])

.controller('TestsCtrl', function($scope, $http, $mdToast) {
	var ipInfo, data;
	var selectedTests = [];
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
			name: "DynamoDB",
			avatar: "/img/db/dynamodb.svg",
			selected: false
		},
		{
			name: "Firebase",
			avatar: "/img/db/firebase.png",
			selected: false
		},
		{
			name: "CouchDB",
			avatar: "/img/db/couchdb.png",
			selected: false
		}
	];
	$scope.testToRun = 0;
	$scope.completedTests = [];

	getIpAddressInfo();

	$scope.testChosen = function(test){
		$scope.tests[test].selected = true;
		console.log($scope.tests[test].label);

		$scope.error = false;
		$scope.step1.completed = true;
		$scope.step2.disabled = false;
		$scope.selectedStep = 1;
	}

	$scope.restart = function(){
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

		for(var i = 0; i < $scope.tests.length; i++){
			$scope.tests[i].selected = false;
		}

		for(var i = 0; i < $scope.databases.length; i++){
			$scope.databases[i].selected = false;
		}
		$scope.$applyAsync();

		$scope.testToRun = 0;
		$scope.completedTests = [];
		$scope.done = false;
		$scope.data = null;
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
				case 0:
					getDataFromFirebase("small");
					break;
				case 1:
					getDataFromFirebase("large");
					break;
				case 2:
					data = "small"
					break;
				case 3:
					data = "large"
					break;
				case 4:
					getDataFromFirebase("small");
					break;
				case 5:
					getDataFromFirebase("large");
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
				selectedTests.push({
					test: test,
					db: $scope.databases[i]
				});
			}
		}
		nextTest();
	}

	function nextTest(){
		$scope.done = true;
		if (selectedTests.length > 0){
			$scope.done = false;
			if (selectedTests[0].test.id == 0 || selectedTests[0].test.id == 1 || selectedTests[0].test.id == 4 || selectedTests[0].test.id == 5)
				runPostTest(selectedTests[0].db);
			else if (selectedTests[0].test.id == 2 || selectedTests[0].test.id == 3)
				runGetTest(selectedTests[0].db);
			selectedTests.splice(0, 1);
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

	function runPostTest(db){
		if (db.name == "Firebase"){
			start();
			$scope.message = "Pushing data to Firebase NoSQL Database...";
			$scope.$applyAsync();
			firebase.database().ref("data/" + JSON.parse($scope.data).data_type).set(JSON.parse($scope.data), function(error){
				if (error){console.error(error.code + ": " + error.message);} else {
                	stop();
                	saveResults(db, JSON.parse($scope.data).data_type);
				}
			});
		} else if (db.name == "DynamoDB"){
			start();
			$scope.message = "Pushing data to DynamoDB...";
			$scope.$applyAsync();
			var data = JSON.parse($scope.data);
			data.test = guid();
			$http({
				url: "http://localhost:3000/dynamo_data",
				method: 'POST',
				data: data,
				headers: {'Content-Type': 'application/json'}
			}).success(function(data){
				stop();
				saveResults(db, JSON.parse($scope.data).data_type);
			}).error(function(error){
				stop();
				console.error(error);
			});

		} else if (db.name == "MongoDB"){
			start();
			$scope.message = "Pushing data to MongoDB...";
			$scope.$applyAsync();
			$http({
				url: "http://localhost:3000/mongo_data",
				method: 'POST',
				data: $scope.data,
				headers: {'Content-Type': 'application/json'}
			}).success(function(data){
				stop();
				saveResults(db, JSON.parse($scope.data).data_type);
			}).error(function(error){
				stop();
				console.error(error);
			});
		} else if (db.name == "CouchDB"){
			start();
			$scope.message = "Pushing data to CouchDB...";
			$scope.$applyAsync();
			$http({
				url: "http://localhost:3000/couch_data",
				method: 'POST',
				data: JSON.parse(($scope.data).replace(/[_-]/g, " ")),
				headers: {'Content-Type': 'application/json'}
			}).success(function(data){
				stop();
				saveResults(db, JSON.parse($scope.data).data_type);
			}).error(function(error){
				stop();
				console.error(error);
			});			
		}
	}

	function runGetTest(db){
		var type = data;
		if (db.name == "Firebase"){
			start();
			$scope.message = "Retrieving Data from Firebase NoSQL Database...";
			$scope.$applyAsync();
			firebase.database().ref('data/' + type).once('value').then(function(snapshot){
				$scope.data = JSON.stringify(snapshot.val(), null, 4);
				stop();
				saveResults(db, JSON.parse($scope.data).data_type);
			});
		} else if (db.name == "DynamoDB"){
			start();
			$scope.message = "Retrieving Data from DynamoDB...";
			$scope.$applyAsync();
			$http({
				url: "http://localhost:3000/dynamo_data_" + type,
				method: 'GET',
				headers: {'Content-Type': 'application/json'}
			}).success(function(data){
				stop();
				$scope.data = JSON.stringify(data, null, 4);
				saveResults(db, type);
			}).error(function(error){
				stop();
				console.error(error);
			});
		} else if (db.name == "MongoDB"){
			start();
			$scope.message = "Retrieving Data from MongoDB...";
			$scope.$applyAsync();
			$http({
				url: "http://localhost:3000/mongo_data_" + type,
				method: 'GET',
				headers: {'Content-Type': 'application/json'}
			}).success(function(data){
				stop();
				$scope.data = JSON.stringify(data, null, 4);
				saveResults(db, type);
			}).error(function(error){
				stop();
				console.error(error);
			});
		} else if (db.name == "CouchDB"){
			start();
			$scope.message = "Retrieving Data from CouchDB...";
			$scope.$applyAsync();
			$http({
				url: "http://localhost:3000/couch_data_" + type,
				method: 'GET',
				headers: {'Content-Type': 'application/json'}
			}).success(function(data){
				stop();
				$scope.data = JSON.stringify(data, null, 4);
				saveResults(db, type);
			}).error(function(error){
				stop();
				console.error(error);
			});			
		}
	}

	function getIpAddressInfo(){
		$http.get('http://ip-api.com/json/').then(function(data){
			console.log(data);
			ipInfo = data.data;
		});
	}

	function saveResults(db, type){
		var test = getSelectedTest().id;
		if (test == 0 || test == 1)
			test = "post";
		else if (test == 2 || test == 3)
			test = "get";
		else if (test == 4 || test == 5)
			test = "update"

		var time = $scope.time;
		firebase.database().ref('test_history/' + test + '/' + db.name.toLowerCase() + '/' + type).push({
			ip: ipInfo,
			time_ms: time
		});

		$scope.completedTests.push({
			db: db,
			time: time,
			result: "Sucess"
		});
		nextTest();
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

	function guid() {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
		}
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
			s4() + '-' + s4() + s4() + s4();
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