'use strict';

angular.module('CloudApp.data_representation', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/charts', {
    templateUrl: 'views/data_representation/view.html',
    controller: 'ChartsCtrl'
  });
}])

.controller('ChartsCtrl', function($scope) {


	//List of all tests
	$scope.tests = [
		{
			id: 0,
			label: "Upload Small Data",
			selected: false
		},
		{
			id: 1,
			label: "Upload Large Data",
			selected: false
		},
		{
			id: 2,
			label: "Retrieve Small Data",
			selected: false
		},
		{
			id: 3,
			label: "Retrieve Large Data",
			selected: false
		},
		{
			id: 4,
			label: "Update Small Data",
			selected: false
		},
		{
			id: 5,
			label: "Update Large Data",
			selected: false
		}
	];

	//List of all databases
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

	//List of databases to display on the graphs
	$scope.series = [$scope.databases[0].name, $scope.databases[1].name, $scope.databases[2].name, $scope.databases[3].name];
	//List of tests that are displayed on the graphs
	$scope.labels = [$scope.tests[0].label, $scope.tests[1].label, $scope.tests[2].label, $scope.tests[3].label, $scope.tests[4].label, $scope.tests[5].label];
	//2 dimensional array 0 initialized
	$scope.data = [
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0]
	];
	//Graph options showing where to put the legend
	$scope.options = {legend: {display: true, position: "bottom"}};

	//2 dimensional array for data from mongodb tests
	$scope.mongoData = [
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0]
	];

	//2 dimensional array for data from dynamodb tests
	$scope.dynamoData = [
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0]
	];

	//2 dimensional array for data from firebase tests
	$scope.fireData = [
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0]
	];

	//2 dimensional array for data from couchdb tests
	$scope.couchData = [
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0]
	];

	/**
	 *	Get test data for all the tests from firebase
	 */
	firebase.database().ref('test_history/post/mongodb/small').on('value', function(snapshot){
		//Calculate the average
		var average = 0, count = 0;
		snapshot.forEach(function(childSnapshot){
			average += childSnapshot.val().time_ms; count++;
		});
		//0 check to avoid divide by 0 error
		if (count > 0)
			average = average/count;
		$scope.data[0][0] = average.toFixed(2);
		$scope.$applyAsync();
	});

	firebase.database().ref('test_history/post/mongodb/large').on('value', function(snapshot){
		//Calculate the average
		var average = 0, count = 0;
		snapshot.forEach(function(childSnapshot){
			average += childSnapshot.val().time_ms; count++;
		});
		//0 check to avoid divide by 0 error
		if (count > 0)
			average = average/count;
		$scope.data[0][1] = average.toFixed(2);
		$scope.$applyAsync();
	});

	firebase.database().ref('test_history/get/mongodb/small').on('value', function(snapshot){
		//Calculate the average
		var average = 0, count = 0;
		snapshot.forEach(function(childSnapshot){
			average += childSnapshot.val().time_ms; count++;
		});
		//0 check to avoid divide by 0 error
		if (count > 0)
			average = average/count;
		$scope.data[0][2] = average.toFixed(2);
		$scope.$applyAsync();
	});

	firebase.database().ref('test_history/get/mongodb/large').on('value', function(snapshot){
		//Calculate the average
		var average = 0, count = 0;
		snapshot.forEach(function(childSnapshot){
			average += childSnapshot.val().time_ms; count++;
		});
		//0 check to avoid divide by 0 error
		if (count > 0)
			average = average/count;
		$scope.data[0][3] = average.toFixed(2);
		$scope.$applyAsync();
	});

	firebase.database().ref('test_history/update/mongodb/small').on('value', function(snapshot){
		//Calculate the average
		var average = 0, count = 0;
		snapshot.forEach(function(childSnapshot){
			average += childSnapshot.val().time_ms; count++;
		});
		//0 check to avoid divide by 0 error
		if (count > 0)
			average = average/count;
		$scope.data[0][4] = average.toFixed(2);
		$scope.$applyAsync();
	});

	firebase.database().ref('test_history/update/mongodb/large').on('value', function(snapshot){
		//Calculate the average
		var average = 0, count = 0;
		snapshot.forEach(function(childSnapshot){
			average += childSnapshot.val().time_ms; count++;
		});
		//0 check to avoid divide by 0 error
		if (count > 0)
			average = average/count;
		$scope.data[0][5] = average.toFixed(2);
		$scope.$applyAsync();
	});

	firebase.database().ref('test_history/post/dynamodb/small').on('value', function(snapshot){
		//Calculate the average
		var average = 0, count = 0;
		snapshot.forEach(function(childSnapshot){
			average += childSnapshot.val().time_ms; count++;
		});
		//0 check to avoid divide by 0 error
		if (count > 0)
			average = average/count;
		$scope.data[1][0] = average.toFixed(2);
		$scope.$applyAsync();
	});

	firebase.database().ref('test_history/post/dynamodb/large').on('value', function(snapshot){
		//Calculate the average
		var average = 0, count = 0;
		snapshot.forEach(function(childSnapshot){
			average += childSnapshot.val().time_ms; count++;
		});
		//0 check to avoid divide by 0 error
		if (count > 0)
			average = average/count;
		$scope.data[1][1] = average.toFixed(2);
		$scope.$applyAsync();
	});

	firebase.database().ref('test_history/get/dynamodb/small').on('value', function(snapshot){
		//Calculate the average
		var average = 0, count = 0;
		snapshot.forEach(function(childSnapshot){
			average += childSnapshot.val().time_ms; count++;
		});
		//0 check to avoid divide by 0 error
		if (count > 0)
			average = average/count;
		$scope.data[1][2] = average.toFixed(2);
		$scope.$applyAsync();
	});

	firebase.database().ref('test_history/get/dynamodb/large').on('value', function(snapshot){
		//Calculate the average
		var average = 0, count = 0;
		snapshot.forEach(function(childSnapshot){
			average += childSnapshot.val().time_ms; count++;
		});
		//0 check to avoid divide by 0 error
		if (count > 0)
			average = average/count;
		$scope.data[1][3] = average.toFixed(2);
		$scope.$applyAsync();
	});

	firebase.database().ref('test_history/update/dynamodb/small').on('value', function(snapshot){
		//Calculate the average
		var average = 0, count = 0;
		snapshot.forEach(function(childSnapshot){
			average += childSnapshot.val().time_ms; count++;
		});
		//0 check to avoid divide by 0 error
		if (count > 0)
			average = average/count;
		$scope.data[1][4] = average.toFixed(2);
		$scope.$applyAsync();
	});

	firebase.database().ref('test_history/update/dynamodb/large').on('value', function(snapshot){
		//Calculate the average
		var average = 0, count = 0;
		snapshot.forEach(function(childSnapshot){
			average += childSnapshot.val().time_ms; count++;
		});
		//0 check to avoid divide by 0 error
		if (count > 0)
			average = average/count;
		$scope.data[1][5] = average.toFixed(2);
		$scope.$applyAsync();
	});

	firebase.database().ref('test_history/post/firebase/small').on('value', function(snapshot){
		//Calculate the average
		var average = 0, count = 0;
		snapshot.forEach(function(childSnapshot){
			average += childSnapshot.val().time_ms; count++;
		});
		//0 check to avoid divide by 0 error
		if (count > 0)
			average = average/count;
		$scope.data[2][0] = average.toFixed(2);
		$scope.$applyAsync();
	});

	firebase.database().ref('test_history/post/firebase/large').on('value', function(snapshot){
		//Calculate the average
		var average = 0, count = 0;
		snapshot.forEach(function(childSnapshot){
			average += childSnapshot.val().time_ms; count++;
		});
		//0 check to avoid divide by 0 error
		if (count > 0)
			average = average/count;
		$scope.data[2][1] = average.toFixed(2);
		$scope.$applyAsync();
	});

	firebase.database().ref('test_history/get/firebase/small').on('value', function(snapshot){
		//Calculate the average
		var average = 0, count = 0;
		snapshot.forEach(function(childSnapshot){
			average += childSnapshot.val().time_ms; count++;
		});
		//0 check to avoid divide by 0 error
		if (count > 0)
			average = average/count;
		$scope.data[2][2] = average.toFixed(2);
		$scope.$applyAsync();
	});

	firebase.database().ref('test_history/get/firebase/large').on('value', function(snapshot){
		//Calculate the average
		var average = 0, count = 0;
		snapshot.forEach(function(childSnapshot){
			average += childSnapshot.val().time_ms; count++;
		});
		//0 check to avoid divide by 0 error
		if (count > 0)
			average = average/count;
		$scope.data[2][3] = average.toFixed(2);
		$scope.$applyAsync();
	});

	firebase.database().ref('test_history/update/firebase/small').on('value', function(snapshot){
		//Calculate the average
		var average = 0, count = 0;
		snapshot.forEach(function(childSnapshot){
			average += childSnapshot.val().time_ms; count++;
		});
		//0 check to avoid divide by 0 error
		if (count > 0)
			average = average/count;
		$scope.data[2][4] = average.toFixed(2);
		$scope.$applyAsync();
	});

	firebase.database().ref('test_history/update/firebase/large').on('value', function(snapshot){
		//Calculate the average
		var average = 0, count = 0;
		snapshot.forEach(function(childSnapshot){
			average += childSnapshot.val().time_ms; count++;
		});
		//0 check to avoid divide by 0 error
		if (count > 0)
			average = average/count;
		$scope.data[2][5] = average.toFixed(2);
		$scope.$applyAsync();
	});

	firebase.database().ref('test_history/post/couchdb/small').on('value', function(snapshot){
		//Calculate the average
		var average = 0, count = 0;
		snapshot.forEach(function(childSnapshot){
			average += childSnapshot.val().time_ms; count++;
		});
		//0 check to avoid divide by 0 error
		if (count > 0)
			average = average/count;
		$scope.data[3][0] = average.toFixed(2);
		$scope.$applyAsync();
	});

	firebase.database().ref('test_history/post/couchdb/large').on('value', function(snapshot){
		//Calculate the average
		var average = 0, count = 0;
		snapshot.forEach(function(childSnapshot){
			average += childSnapshot.val().time_ms; count++;
		});
		//0 check to avoid divide by 0 error
		if (count > 0)
			average = average/count;
		$scope.data[3][1] = average.toFixed(2);
		$scope.$applyAsync();
	});

	firebase.database().ref('test_history/get/couchdb/small').on('value', function(snapshot){
		//Calculate the average
		var average = 0, count = 0;
		snapshot.forEach(function(childSnapshot){
			average += childSnapshot.val().time_ms; count++;
		});
		//0 check to avoid divide by 0 error
		if (count > 0)
			average = average/count;
		$scope.data[3][2] = average.toFixed(2);
		$scope.$applyAsync();
	});

	firebase.database().ref('test_history/get/couchdb/large').on('value', function(snapshot){
		//Calculate the average
		var average = 0, count = 0;
		snapshot.forEach(function(childSnapshot){
			average += childSnapshot.val().time_ms; count++;
		});
		//0 check to avoid divide by 0 error
		if (count > 0)
			average = average/count;
		$scope.data[3][3] = average.toFixed(2);
		$scope.$applyAsync();
	});

	firebase.database().ref('test_history/update/couchdb/small').on('value', function(snapshot){
		//Calculate the average
		var average = 0, count = 0;
		snapshot.forEach(function(childSnapshot){
			average += childSnapshot.val().time_ms; count++;
		});
		//0 check to avoid divide by 0 error
		if (count > 0)
			average = average/count;
		$scope.data[3][4] = average.toFixed(2);
		$scope.$applyAsync();
	});

	firebase.database().ref('test_history/update/couchdb/large').on('value', function(snapshot){
		//Calculate the average
		var average = 0, count = 0;
		snapshot.forEach(function(childSnapshot){
			average += childSnapshot.val().time_ms; count++;
		});
		//0 check to avoid divide by 0 error
		if (count > 0)
			average = average/count;
		$scope.data[3][5] = average.toFixed(2);
		$scope.$applyAsync();
	});




	firebase.database().ref('test_history/post/mongodb/small').on('value', function(snapshot){
		var lowest = 9999;
		var highest = 0;
		//Get the highest and lowest times
		snapshot.forEach(function(childSnapshot){
			if (childSnapshot.val().time_ms > highest){
				highest = childSnapshot.val().time_ms;
			}
			if (childSnapshot.val().time_ms < lowest){
				lowest = childSnapshot.val().time_ms;
			}
			$scope.mongoData[0][0] = highest;
			$scope.mongoData[1][0] = lowest;
		});
	});

	firebase.database().ref('test_history/post/mongodb/large').on('value', function(snapshot){
		var lowest = 9999;
		var highest = 0;
		//Get the highest and lowest times
		snapshot.forEach(function(childSnapshot){
			if (childSnapshot.val().time_ms > highest){
				highest = childSnapshot.val().time_ms;
			}
			if (childSnapshot.val().time_ms < lowest){
				lowest = childSnapshot.val().time_ms;
			}
			$scope.mongoData[0][1] = highest;
			$scope.mongoData[1][1] = lowest;
		});
	});

	firebase.database().ref('test_history/get/mongodb/small').on('value', function(snapshot){
		var lowest = 9999;
		var highest = 0;
		//Get the highest and lowest times
		snapshot.forEach(function(childSnapshot){
			if (childSnapshot.val().time_ms > highest){
				highest = childSnapshot.val().time_ms;
			}
			if (childSnapshot.val().time_ms < lowest){
				lowest = childSnapshot.val().time_ms;
			}
			$scope.mongoData[0][2] = highest;
			$scope.mongoData[1][2] = lowest;
		});
	});

	firebase.database().ref('test_history/get/mongodb/large').on('value', function(snapshot){
		var lowest = 9999;
		var highest = 0;
		//Get the highest and lowest times
		snapshot.forEach(function(childSnapshot){
			if (childSnapshot.val().time_ms > highest){
				highest = childSnapshot.val().time_ms;
			}
			if (childSnapshot.val().time_ms < lowest){
				lowest = childSnapshot.val().time_ms;
			}
			$scope.mongoData[0][3] = highest;
			$scope.mongoData[1][3] = lowest;
		});
	});

	firebase.database().ref('test_history/update/mongodb/small').on('value', function(snapshot){
		var lowest = 9999;
		var highest = 0;
		//Get the highest and lowest times
		snapshot.forEach(function(childSnapshot){
			if (childSnapshot.val().time_ms > highest){
				highest = childSnapshot.val().time_ms;
			}
			if (childSnapshot.val().time_ms < lowest){
				lowest = childSnapshot.val().time_ms;
			}
			$scope.mongoData[0][4] = highest;
			$scope.mongoData[1][4] = lowest;
		});
	});

	firebase.database().ref('test_history/update/mongodb/large').on('value', function(snapshot){
		var lowest = 9999;
		var highest = 0;
		//Get the highest and lowest times
		snapshot.forEach(function(childSnapshot){
			if (childSnapshot.val().time_ms > highest){
				highest = childSnapshot.val().time_ms;
			}
			if (childSnapshot.val().time_ms < lowest){
				lowest = childSnapshot.val().time_ms;
			}
			$scope.mongoData[0][5] = highest;
			$scope.mongoData[1][5] = lowest;
		});
	});

	firebase.database().ref('test_history/post/dynamodb/small').on('value', function(snapshot){
		var lowest = 9999;
		var highest = 0;
		//Get the highest and lowest times
		snapshot.forEach(function(childSnapshot){
			if (childSnapshot.val().time_ms > highest){
				highest = childSnapshot.val().time_ms;
			}
			if (childSnapshot.val().time_ms < lowest){
				lowest = childSnapshot.val().time_ms;
			}
			$scope.dynamoData[0][0] = highest;
			$scope.dynamoData[1][0] = lowest;
		});
	});

	firebase.database().ref('test_history/post/dynamodb/large').on('value', function(snapshot){
		var lowest = 9999;
		var highest = 0;
		//Get the highest and lowest times
		snapshot.forEach(function(childSnapshot){
			if (childSnapshot.val().time_ms > highest){
				highest = childSnapshot.val().time_ms;
			}
			if (childSnapshot.val().time_ms < lowest){
				lowest = childSnapshot.val().time_ms;
			}
			$scope.dynamoData[0][1] = highest;
			$scope.dynamoData[1][1] = lowest;
		});
	});

	firebase.database().ref('test_history/get/dynamodb/small').on('value', function(snapshot){
		var lowest = 9999;
		var highest = 0;
		//Get the highest and lowest times
		snapshot.forEach(function(childSnapshot){
			if (childSnapshot.val().time_ms > highest){
				highest = childSnapshot.val().time_ms;
			}
			if (childSnapshot.val().time_ms < lowest){
				lowest = childSnapshot.val().time_ms;
			}
			$scope.dynamoData[0][2] = highest;
			$scope.dynamoData[1][2] = lowest;
		});
	});

	firebase.database().ref('test_history/get/dynamodb/large').on('value', function(snapshot){
		var lowest = 9999;
		var highest = 0;
		//Get the highest and lowest times
		snapshot.forEach(function(childSnapshot){
			if (childSnapshot.val().time_ms > highest){
				highest = childSnapshot.val().time_ms;
			}
			if (childSnapshot.val().time_ms < lowest){
				lowest = childSnapshot.val().time_ms;
			}
			$scope.dynamoData[0][3] = highest;
			$scope.dynamoData[1][3] = lowest;
		});
	});

	firebase.database().ref('test_history/update/dynamodb/small').on('value', function(snapshot){
		var lowest = 9999;
		var highest = 0;
		//Get the highest and lowest times
		snapshot.forEach(function(childSnapshot){
			if (childSnapshot.val().time_ms > highest){
				highest = childSnapshot.val().time_ms;
			}
			if (childSnapshot.val().time_ms < lowest){
				lowest = childSnapshot.val().time_ms;
			}
			$scope.dynamoData[0][4] = highest;
			$scope.dynamoData[1][4] = lowest;
		});
	});

	firebase.database().ref('test_history/update/dynamodb/large').on('value', function(snapshot){
		var lowest = 9999;
		var highest = 0;
		//Get the highest and lowest times
		snapshot.forEach(function(childSnapshot){
			if (childSnapshot.val().time_ms > highest){
				highest = childSnapshot.val().time_ms;
			}
			if (childSnapshot.val().time_ms < lowest){
				lowest = childSnapshot.val().time_ms;
			}
			$scope.dynamoData[0][5] = highest;
			$scope.dynamoData[1][5] = lowest;
		});
	});

	firebase.database().ref('test_history/post/firebase/small').on('value', function(snapshot){
		var lowest = 9999;
		var highest = 0;
		//Get the highest and lowest times
		snapshot.forEach(function(childSnapshot){
			if (childSnapshot.val().time_ms > highest){
				highest = childSnapshot.val().time_ms;
			}
			if (childSnapshot.val().time_ms < lowest){
				lowest = childSnapshot.val().time_ms;
			}
			$scope.fireData[0][0] = highest;
			$scope.fireData[1][0] = lowest;
		});
	});

	firebase.database().ref('test_history/post/firebase/large').on('value', function(snapshot){
		var lowest = 9999;
		var highest = 0;
		//Get the highest and lowest times
		snapshot.forEach(function(childSnapshot){
			if (childSnapshot.val().time_ms > highest){
				highest = childSnapshot.val().time_ms;
			}
			if (childSnapshot.val().time_ms < lowest){
				lowest = childSnapshot.val().time_ms;
			}
			$scope.fireData[0][1] = highest;
			$scope.fireData[1][1] = lowest;
		});
	});

	firebase.database().ref('test_history/get/firebase/small').on('value', function(snapshot){
		var lowest = 9999;
		var highest = 0;
		//Get the highest and lowest times
		snapshot.forEach(function(childSnapshot){
			if (childSnapshot.val().time_ms > highest){
				highest = childSnapshot.val().time_ms;
			}
			if (childSnapshot.val().time_ms < lowest){
				lowest = childSnapshot.val().time_ms;
			}
			$scope.fireData[0][2] = highest;
			$scope.fireData[1][2] = lowest;
		});
	});

	firebase.database().ref('test_history/get/firebase/large').on('value', function(snapshot){
		var lowest = 9999;
		var highest = 0;
		//Get the highest and lowest times
		snapshot.forEach(function(childSnapshot){
			if (childSnapshot.val().time_ms > highest){
				highest = childSnapshot.val().time_ms;
			}
			if (childSnapshot.val().time_ms < lowest){
				lowest = childSnapshot.val().time_ms;
			}
			$scope.fireData[0][3] = highest;
			$scope.fireData[1][3] = lowest;
		});
	});

	firebase.database().ref('test_history/update/firebase/small').on('value', function(snapshot){
		var lowest = 9999;
		var highest = 0;
		//Get the highest and lowest times
		snapshot.forEach(function(childSnapshot){
			if (childSnapshot.val().time_ms > highest){
				highest = childSnapshot.val().time_ms;
			}
			if (childSnapshot.val().time_ms < lowest){
				lowest = childSnapshot.val().time_ms;
			}
			$scope.fireData[0][4] = highest;
			$scope.fireData[1][4] = lowest;
		});
	});

	firebase.database().ref('test_history/update/firebase/large').on('value', function(snapshot){
		var lowest = 9999;
		var highest = 0;
		//Get the highest and lowest times
		snapshot.forEach(function(childSnapshot){
			if (childSnapshot.val().time_ms > highest){
				highest = childSnapshot.val().time_ms;
			}
			if (childSnapshot.val().time_ms < lowest){
				lowest = childSnapshot.val().time_ms;
			}
			$scope.fireData[0][5] = highest;
			$scope.fireData[1][5] = lowest;
		});
	});

	firebase.database().ref('test_history/post/couchdb/small').on('value', function(snapshot){
		var lowest = 9999;
		var highest = 0;
		//Get the highest and lowest times
		snapshot.forEach(function(childSnapshot){
			if (childSnapshot.val().time_ms > highest){
				highest = childSnapshot.val().time_ms;
			}
			if (childSnapshot.val().time_ms < lowest){
				lowest = childSnapshot.val().time_ms;
			}
			$scope.couchData[0][0] = highest;
			$scope.couchData[1][0] = lowest;
		});
	});

	firebase.database().ref('test_history/post/couchdb/large').on('value', function(snapshot){
		var lowest = 9999;
		var highest = 0;
		//Get the highest and lowest times
		snapshot.forEach(function(childSnapshot){
			if (childSnapshot.val().time_ms > highest){
				highest = childSnapshot.val().time_ms;
			}
			if (childSnapshot.val().time_ms < lowest){
				lowest = childSnapshot.val().time_ms;
			}
			$scope.couchData[0][1] = highest;
			$scope.couchData[1][1] = lowest;
		});
	});

	firebase.database().ref('test_history/get/couchdb/small').on('value', function(snapshot){
		var lowest = 9999;
		var highest = 0;
		//Get the highest and lowest times
		snapshot.forEach(function(childSnapshot){
			if (childSnapshot.val().time_ms > highest){
				highest = childSnapshot.val().time_ms;
			}
			if (childSnapshot.val().time_ms < lowest){
				lowest = childSnapshot.val().time_ms;
			}
			$scope.couchData[0][2] = highest;
			$scope.couchData[1][2] = lowest;
		});
	});

	firebase.database().ref('test_history/get/couchdb/large').on('value', function(snapshot){
		var lowest = 9999;
		var highest = 0;
		//Get the highest and lowest times
		snapshot.forEach(function(childSnapshot){
			if (childSnapshot.val().time_ms > highest){
				highest = childSnapshot.val().time_ms;
			}
			if (childSnapshot.val().time_ms < lowest){
				lowest = childSnapshot.val().time_ms;
			}
			$scope.couchData[0][3] = highest;
			$scope.couchData[1][3] = lowest;
		});
	});

	firebase.database().ref('test_history/update/couchdb/small').on('value', function(snapshot){
		var lowest = 9999;
		var highest = 0;
		//Get the highest and lowest times
		snapshot.forEach(function(childSnapshot){
			if (childSnapshot.val().time_ms > highest){
				highest = childSnapshot.val().time_ms;
			}
			if (childSnapshot.val().time_ms < lowest){
				lowest = childSnapshot.val().time_ms;
			}
			$scope.couchData[0][4] = highest;
			$scope.couchData[1][4] = lowest;
		});
	});

	firebase.database().ref('test_history/update/couchdb/large').on('value', function(snapshot){
		var lowest = 9999;
		var highest = 0;
		//Get the highest and lowest times
		snapshot.forEach(function(childSnapshot){
			if (childSnapshot.val().time_ms > highest){
				highest = childSnapshot.val().time_ms;
			}
			if (childSnapshot.val().time_ms < lowest){
				lowest = childSnapshot.val().time_ms;
			}
			$scope.couchData[0][5] = highest;
			$scope.couchData[1][5] = lowest;
		});
	});

	//For each test for each database get the latitude and longitude of where the test was performed and add them to heatmapData to display on the map
	$scope.heatmapData = [];
	firebase.database().ref('test_history/get/couchdb/small').on('value', function(snapshot){
		snapshot.forEach(function(childSnapshot){
			$scope.heatmapData.push({location: new google.maps.LatLng(childSnapshot.val().ip.latitude, childSnapshot.val().ip.longitude), weight: childSnapshot.val().time_ms});
			$scope.$applyAsync();
		});
	});
	firebase.database().ref('test_history/get/couchdb/large').on('value', function(snapshot){
		snapshot.forEach(function(childSnapshot){
			$scope.heatmapData.push({location: new google.maps.LatLng(childSnapshot.val().ip.latitude, childSnapshot.val().ip.longitude), weight: childSnapshot.val().time_ms});
			$scope.$applyAsync();
		});
	});
	firebase.database().ref('test_history/get/dynamodb/small').on('value', function(snapshot){
		snapshot.forEach(function(childSnapshot){
			$scope.heatmapData.push({location: new google.maps.LatLng(childSnapshot.val().ip.latitude, childSnapshot.val().ip.longitude), weight: childSnapshot.val().time_ms});
			$scope.$applyAsync();
		});
	});
	firebase.database().ref('test_history/get/dynamodb/large').on('value', function(snapshot){
		snapshot.forEach(function(childSnapshot){
			$scope.heatmapData.push({location: new google.maps.LatLng(childSnapshot.val().ip.latitude, childSnapshot.val().ip.longitude), weight: childSnapshot.val().time_ms});
			$scope.$applyAsync();
		});
	});
	firebase.database().ref('test_history/get/firebase/small').on('value', function(snapshot){
		snapshot.forEach(function(childSnapshot){
			$scope.heatmapData.push({location: new google.maps.LatLng(childSnapshot.val().ip.latitude, childSnapshot.val().ip.longitude), weight: childSnapshot.val().time_ms});
			$scope.$applyAsync();
		});
	});
	firebase.database().ref('test_history/get/firebase/large').on('value', function(snapshot){
		snapshot.forEach(function(childSnapshot){
			$scope.heatmapData.push({location: new google.maps.LatLng(childSnapshot.val().ip.latitude, childSnapshot.val().ip.longitude), weight: childSnapshot.val().time_ms});
			$scope.$applyAsync();
		});
	});
	firebase.database().ref('test_history/get/mongodb/small').on('value', function(snapshot){
		snapshot.forEach(function(childSnapshot){
			$scope.heatmapData.push({location: new google.maps.LatLng(childSnapshot.val().ip.latitude, childSnapshot.val().ip.longitude), weight: childSnapshot.val().time_ms});
			$scope.$applyAsync();
		});
	});
	firebase.database().ref('test_history/get/mongodb/large').on('value', function(snapshot){
		snapshot.forEach(function(childSnapshot){
			$scope.heatmapData.push({location: new google.maps.LatLng(childSnapshot.val().ip.latitude, childSnapshot.val().ip.longitude), weight: childSnapshot.val().time_ms});
			$scope.$applyAsync();
		});
	});
	firebase.database().ref('test_history/post/couchdb/small').on('value', function(snapshot){
		snapshot.forEach(function(childSnapshot){
			$scope.heatmapData.push({location: new google.maps.LatLng(childSnapshot.val().ip.latitude, childSnapshot.val().ip.longitude), weight: childSnapshot.val().time_ms});
			$scope.$applyAsync();
		});
	});
	firebase.database().ref('test_history/post/couchdb/large').on('value', function(snapshot){
		snapshot.forEach(function(childSnapshot){
			$scope.heatmapData.push({location: new google.maps.LatLng(childSnapshot.val().ip.latitude, childSnapshot.val().ip.longitude), weight: childSnapshot.val().time_ms});
			$scope.$applyAsync();
		});
	});
	firebase.database().ref('test_history/post/dynamodb/small').on('value', function(snapshot){
		snapshot.forEach(function(childSnapshot){
			$scope.heatmapData.push({location: new google.maps.LatLng(childSnapshot.val().ip.latitude, childSnapshot.val().ip.longitude), weight: childSnapshot.val().time_ms});
			$scope.$applyAsync();
		});
	});
	firebase.database().ref('test_history/post/dynamodb/large').on('value', function(snapshot){
		snapshot.forEach(function(childSnapshot){
			$scope.heatmapData.push({location: new google.maps.LatLng(childSnapshot.val().ip.latitude, childSnapshot.val().ip.longitude), weight: childSnapshot.val().time_ms});
			$scope.$applyAsync();
		});
	});
	firebase.database().ref('test_history/post/firebase/small').on('value', function(snapshot){
		snapshot.forEach(function(childSnapshot){
			$scope.heatmapData.push({location: new google.maps.LatLng(childSnapshot.val().ip.latitude, childSnapshot.val().ip.longitude), weight: childSnapshot.val().time_ms});
			$scope.$applyAsync();
		});
	});
	firebase.database().ref('test_history/post/firebase/large').on('value', function(snapshot){
		snapshot.forEach(function(childSnapshot){
			$scope.heatmapData.push({location: new google.maps.LatLng(childSnapshot.val().ip.latitude, childSnapshot.val().ip.longitude), weight: childSnapshot.val().time_ms});
			$scope.$applyAsync();
		});
	});
	firebase.database().ref('test_history/post/mongodb/small').on('value', function(snapshot){
		snapshot.forEach(function(childSnapshot){
			$scope.heatmapData.push({location: new google.maps.LatLng(childSnapshot.val().ip.latitude, childSnapshot.val().ip.longitude), weight: childSnapshot.val().time_ms});
			$scope.$applyAsync();
		});
	});
	firebase.database().ref('test_history/post/mongodb/large').on('value', function(snapshot){
		snapshot.forEach(function(childSnapshot){
			$scope.heatmapData.push({location: new google.maps.LatLng(childSnapshot.val().ip.latitude, childSnapshot.val().ip.longitude), weight: childSnapshot.val().time_ms});
			$scope.$applyAsync();
		});
	});
	firebase.database().ref('test_history/update/couchdb/small').on('value', function(snapshot){
		snapshot.forEach(function(childSnapshot){
			$scope.heatmapData.push({location: new google.maps.LatLng(childSnapshot.val().ip.latitude, childSnapshot.val().ip.longitude), weight: childSnapshot.val().time_ms});
			$scope.$applyAsync();
		});
	});
	firebase.database().ref('test_history/update/couchdb/large').on('value', function(snapshot){
		snapshot.forEach(function(childSnapshot){
			$scope.heatmapData.push({location: new google.maps.LatLng(childSnapshot.val().ip.latitude, childSnapshot.val().ip.longitude), weight: childSnapshot.val().time_ms});
			$scope.$applyAsync();
		});
	});
	firebase.database().ref('test_history/update/dynamodb/small').on('value', function(snapshot){
		snapshot.forEach(function(childSnapshot){
			$scope.heatmapData.push({location: new google.maps.LatLng(childSnapshot.val().ip.latitude, childSnapshot.val().ip.longitude), weight: childSnapshot.val().time_ms});
			$scope.$applyAsync();
		});
	});
	firebase.database().ref('test_history/update/dynamodb/large').on('value', function(snapshot){
		snapshot.forEach(function(childSnapshot){
			$scope.heatmapData.push({location: new google.maps.LatLng(childSnapshot.val().ip.latitude, childSnapshot.val().ip.longitude), weight: childSnapshot.val().time_ms});
			$scope.$applyAsync();
		});
	});
	firebase.database().ref('test_history/update/firebase/small').on('value', function(snapshot){
		snapshot.forEach(function(childSnapshot){
			$scope.heatmapData.push({location: new google.maps.LatLng(childSnapshot.val().ip.latitude, childSnapshot.val().ip.longitude), weight: childSnapshot.val().time_ms});
			$scope.$applyAsync();
		});
	});
	firebase.database().ref('test_history/update/firebase/large').on('value', function(snapshot){
		snapshot.forEach(function(childSnapshot){
			$scope.heatmapData.push({location: new google.maps.LatLng(childSnapshot.val().ip.latitude, childSnapshot.val().ip.longitude), weight: childSnapshot.val().time_ms});
			$scope.$applyAsync();
		});
	});
	firebase.database().ref('test_history/update/mongodb/small').on('value', function(snapshot){
		snapshot.forEach(function(childSnapshot){
			$scope.heatmapData.push({location: new google.maps.LatLng(childSnapshot.val().ip.latitude, childSnapshot.val().ip.longitude), weight: childSnapshot.val().time_ms});
			$scope.$applyAsync();
		});
	});
	firebase.database().ref('test_history/update/mongodb/large').on('value', function(snapshot){
		snapshot.forEach(function(childSnapshot){
			$scope.heatmapData.push({location: new google.maps.LatLng(childSnapshot.val().ip.latitude, childSnapshot.val().ip.longitude), weight: childSnapshot.val().time_ms});
			$scope.$applyAsync();
		});
	});

});