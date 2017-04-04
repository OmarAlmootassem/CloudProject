'use strict';

angular.module('CloudApp.tests', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/run_tests', {
    templateUrl: 'views/run_tests/view.html',
    controller: 'TestsCtrl'
  });
}])

.controller('TestsCtrl', function($scope, $http, $mdToast) {
	//Initializing variables
	var ipInfo, data;
	var selectedTests = [];
	//Selected step in the md-stepper
	$scope.selectedStep = 0;
	//Steps for the md-stepper
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

	//List of tests
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

	//List of databases
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

	//Gets IP Address from API
	getIpAddressInfo();

	/**
	 *	Called when a test is chosen in the md-stepper, goes to next step and
	 *	saves the test
	 *  @param test - the chosen test 
	 */
	$scope.testChosen = function(test){
		$scope.tests[test].selected = true;
		console.log($scope.tests[test].label);

		$scope.error = false;
		$scope.step1.completed = true;
		$scope.step2.disabled = false;
		$scope.selectedStep = 1;
	}

	/**
	 *	Called when the test is finished and the user chooses to run another test,
	 *  resets all variables back to initial value
	 */
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

	/**
	 *	Called when databases are chosen in the md-stepper, it retrieves the whatever data needed
	 *	from Firebase and validates the input
	 *  @param databases - the databases chosen 
	 */
	$scope.databasesChosen = function(databases){
		console.log(databases);
		var selected = false;
		//Checks that atleast one database is selected
		for(var i = 0; i < $scope.databases.length; i++){
			if ($scope.databases[i].selected){
				selected = true;
			}
		}

		//If atleast 1 database is selected prepare to run the test
		if (selected){
			$scope.error = false;
			$scope.step2.completed = true;
			$scope.step3.disabled = false;
			$scope.selectedStep = 2;

			//Get the data needed to run the test depending on the test id
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
			//If no test is selected, display an error
			$scope.error = true;
			$mdToast.show(
			$mdToast.simple()
			  .textContent('Please Select At Least 1 Database')
			  .hideDelay(5000)
			);
		}
	}

	/**
	 *	Starts the test
	 */
	$scope.startTest = function(){
		//Gets the selected test
		var test = getSelectedTest();
		for (var i = $scope.databases.length - 1; i >= 0; i--) {
			//If the test is selected, then add the databases that are selected alongside selectedTests
			if($scope.databases[i].selected){
				selectedTests.push({
					test: test,
					db: $scope.databases[i]
				});
			}
		}
		nextTest();
	}

	/**
	 *	Gets the next test that will be run
	 */
	function nextTest(){
		$scope.done = true;
		//Checks if there are any tests left
		if (selectedTests.length > 0){
			$scope.done = false;
			//If the test is POST or PUT, then run a POST test
			if (selectedTests[0].test.id == 0 || selectedTests[0].test.id == 1 || selectedTests[0].test.id == 4 || selectedTests[0].test.id == 5)
				runPostTest(selectedTests[0].db);
			//If the test is GET, then run a GET test
			else if (selectedTests[0].test.id == 2 || selectedTests[0].test.id == 3)
				runGetTest(selectedTests[0].db);
			//Remove the test from the list
			selectedTests.splice(0, 1);
		}
	}

	/**
	 *	Loops through the tests list and returns the selected tests
	 */
	function getSelectedTest(){
		for (var i = $scope.tests.length - 1; i >= 0; i--) {
			if($scope.tests[i].selected)
				return $scope.tests[i];
		}
	}

	/**
	 *	Retrieves a JSON file from Firebase Storage to run the test with
	 *  @param size - the size of the data that will get retrieved 
	 */
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

	/**
	 *	Runs POST tests depending on which database is chosen
	 *  @param db - the chosen database 
	 */
	function runPostTest(db){
		//If Firebase is chosen then connect directly to firebase and push the data
		if (db.name == "Firebase"){
			start();	//Start the timer
			$scope.message = "Pushing data to Firebase NoSQL Database...";
			$scope.$applyAsync();
			firebase.database().ref("data/" + JSON.parse($scope.data).data_type).set(JSON.parse($scope.data), function(error){
				if (error){console.error(error.code + ": " + error.message);} else {
                	stop();	//Stop the timer
                	saveResults(db, JSON.parse($scope.data).data_type);
				}
			});
		//If DynamoDB is chosen then http POST to the server to dynamo_data
		} else if (db.name == "DynamoDB"){
			start();	//Start the timer
			$scope.message = "Pushing data to DynamoDB...";
			$scope.$applyAsync();
			var data = JSON.parse($scope.data);
			data.test = guid();
			$http({
				url: "http://ec2-34-208-119-60.us-west-2.compute.amazonaws.com:3000/dynamo_data",
				method: 'POST',
				data: data,
				headers: {'Content-Type': 'application/json'}
			}).success(function(data){
				stop();	//Stop the timer
				saveResults(db, JSON.parse($scope.data).data_type);	//Save the result
			}).error(function(error){
				stop();	//Stop the timer
				console.error(error);	//Print out error
			});
		//If MongoDB is chosen then http POST to the server to mongo_data
		} else if (db.name == "MongoDB"){
			start();	//Star the timer
			$scope.message = "Pushing data to MongoDB...";
			$scope.$applyAsync();
			$http({
				url: "http://ec2-34-208-119-60.us-west-2.compute.amazonaws.com:3000/mongo_data",
				method: 'POST',
				data: $scope.data,
				headers: {'Content-Type': 'application/json'}
			}).success(function(data){
				stop();	//Stop the timer
				saveResults(db, JSON.parse($scope.data).data_type);	//Save the result
			}).error(function(error){
				stop();	//Stop the timer
				console.error(error);	//Print out error
			});
		//If CouchDB is chosen then http POST to the server to couch_data
		} else if (db.name == "CouchDB"){
			start();	//Start the timer
			$scope.message = "Pushing data to CouchDB...";
			$scope.$applyAsync();
			$http({
				url: "http://ec2-34-208-119-60.us-west-2.compute.amazonaws.com:3000/couch_data",
				method: 'POST',
				data: JSON.parse(($scope.data).replace(/[_-]/g, " ")),
				headers: {'Content-Type': 'application/json'}
			}).success(function(data){
				stop();	//Stop the timer
				saveResults(db, JSON.parse($scope.data).data_type);	//Save the result
			}).error(function(error){
				stop();	//Stop the timer
				console.error(error);
			});			
		}
	}

	/**
	 *	Runs GET tests depending on which database is chosen
	 *  @param db - the chosen database 
	 */
	function runGetTest(db){
		var type = data;
		//If Firebase is chosen
		if (db.name == "Firebase"){
			start();	//Start the timer
			$scope.message = "Retrieving Data from Firebase NoSQL Database...";
			$scope.$applyAsync();
			firebase.database().ref('data/' + type).once('value').then(function(snapshot){
				$scope.data = JSON.stringify(snapshot.val(), null, 4);	//Save the retrieved data to display on the page
				stop();	//Stop the timer
				saveResults(db, JSON.parse($scope.data).data_type);	//Save the result
			});
		//If DynamoDB is chosen then http GET to the server to dynamo_data_
		} else if (db.name == "DynamoDB"){
			start();	//Start timer 
			$scope.message = "Retrieving Data from DynamoDB...";
			$scope.$applyAsync();
			$http({
				url: "http://ec2-34-208-119-60.us-west-2.compute.amazonaws.com:3000/dynamo_data_" + type,
				method: 'GET',
				headers: {'Content-Type': 'application/json'}
			}).success(function(data){
				stop();	//Stop the timer
				$scope.data = JSON.stringify(data, null, 4);	//Save the retrieved data to display on the page
				saveResults(db, type);	//Save the results
			}).error(function(error){
				stop();	//Stop the timer
				console.error(error);
			});
		//If MongoDB is chosen then http GET to the server to mongo_data_
		} else if (db.name == "MongoDB"){
			start();	//Star the timer
			$scope.message = "Retrieving Data from MongoDB...";
			$scope.$applyAsync();
			$http({
				url: "http://ec2-34-208-119-60.us-west-2.compute.amazonaws.com:3000/mongo_data_" + type,
				method: 'GET',
				headers: {'Content-Type': 'application/json'}
			}).success(function(data){
				stop();	//Stop the timer
				$scope.data = JSON.stringify(data, null, 4);	//Save the retrieved data to display on the page
				saveResults(db, type);	//Save the results
			}).error(function(error){
				stop();	//Stop the timer
				console.error(error);
			});
		//If CouchDB is chosen then http GET to the server to couch_data_
		} else if (db.name == "CouchDB"){
			start();	//Start the tiemr
			$scope.message = "Retrieving Data from CouchDB...";
			$scope.$applyAsync();
			$http({
				url: "http://ec2-34-208-119-60.us-west-2.compute.amazonaws.com:3000/couch_data_" + type,
				method: 'GET',
				headers: {'Content-Type': 'application/json'}
			}).success(function(data){
				stop();	//Stop the timer
				$scope.data = JSON.stringify(data, null, 4);	//Save the retrieved data to display on the page
				saveResults(db, type);	//Save the result
			}).error(function(error){
				stop();	//Stop the timer
				console.error(error);
			});			
		}
	}

	/**
	 * Gets the IP address info using freegeoip api
	 */
	function getIpAddressInfo(){
		$http.get('http://freegeoip.net/json/').then(function(data){
			console.log(data);
			ipInfo = data.data;
		});
	}

	/**
	 *	Save the results of the tests in the database
	 *	@param db - the database used in the test
	 *	@param type - the type of the test
	 */
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

	//Listens to when the timer stops
	$scope.$on('timer-stopped', function (event, data){
		console.log(data);
		$scope.time = data.millis;
	});

	/**
	 * Starts the timer by creating a broadcast event
	 */
	function start(){
		$scope.$broadcast('timer-reset');
		$scope.$broadcast('timer-start');
		$scope.running = true;
		$scope.message = "Starting test...";
	}

	/**
	 * Stops the timer by creating a broadcast event
	 */
	function stop(){
		$scope.$broadcast('timer-stop');
		$scope.running = false;
		$scope.message = "Finished test...";
	}

	/**
	 * Creates a unique id
	 */
	function guid() {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
		}
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
			s4() + '-' + s4() + s4() + s4();
	}

	/**
	 *	Goes back to the database selection step
	 */
	$scope.editDB = function(){
		$scope.selectedStep = 1;
		$scope.step3.disabled = true;
	}

	/**
	 *	Goes back to test selection step
	 */
	$scope.changeTest = function(){
		$scope.selectedStep = 0;
		$scope.step3.disabled = true;
	}
});