'use strict';

angular.module('CloudApp.data_representation', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/charts', {
    templateUrl: 'views/data_representation/view.html',
    controller: 'ChartsCtrl'
  });
}])

.controller('ChartsCtrl', function($scope) {

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

	$scope.series = [$scope.databases[0].name, $scope.databases[1].name, $scope.databases[2].name, $scope.databases[3].name];
	$scope.labels = [$scope.tests[0].label, $scope.tests[1].label, $scope.tests[2].label, $scope.tests[3].label, $scope.tests[4].label, $scope.tests[5].label];
	$scope.data = [
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0]
	];

	firebase.database().ref('test_history/post/mongodb/small').on('value', function(snapshot){
		var average = 0, count = 0;
		snapshot.forEach(function(childSnapshot){
			average += childSnapshot.val().time_ms; count++;
		});
		if (count > 0)
			average = average/count;
		$scope.data[0][0] = average.toFixed(2);
		$scope.$applyAsync();
	});

	firebase.database().ref('test_history/post/mongodb/large').on('value', function(snapshot){
		var average = 0, count = 0;
		snapshot.forEach(function(childSnapshot){
			average += childSnapshot.val().time_ms; count++;
		});
		if (count > 0)
			average = average/count;
		$scope.data[0][1] = average.toFixed(2);
		$scope.$applyAsync();
	});

	firebase.database().ref('test_history/get/mongodb/small').on('value', function(snapshot){
		var average = 0, count = 0;
		snapshot.forEach(function(childSnapshot){
			average += childSnapshot.val().time_ms; count++;
		});
		if (count > 0)
			average = average/count;
		$scope.data[0][2] = average.toFixed(2);
		$scope.$applyAsync();
	});

	firebase.database().ref('test_history/get/mongodb/large').on('value', function(snapshot){
		var average = 0, count = 0;
		snapshot.forEach(function(childSnapshot){
			average += childSnapshot.val().time_ms; count++;
		});
		if (count > 0)
			average = average/count;
		$scope.data[0][3] = average.toFixed(2);
		$scope.$applyAsync();
	});

	firebase.database().ref('test_history/update/mongodb/small').on('value', function(snapshot){
		var average = 0, count = 0;
		snapshot.forEach(function(childSnapshot){
			average += childSnapshot.val().time_ms; count++;
		});
		if (count > 0)
			average = average/count;
		$scope.data[0][4] = average.toFixed(2);
		$scope.$applyAsync();
	});

	firebase.database().ref('test_history/update/mongodb/large').on('value', function(snapshot){
		var average = 0, count = 0;
		snapshot.forEach(function(childSnapshot){
			average += childSnapshot.val().time_ms; count++;
		});
		if (count > 0)
			average = average/count;
		$scope.data[0][5] = average.toFixed(2);
		$scope.$applyAsync();
		console.log($scope.data)
	});

	firebase.database().ref('test_history/post/dynamodb/small').on('value', function(snapshot){
		var average = 0, count = 0;
		snapshot.forEach(function(childSnapshot){
			average += childSnapshot.val().time_ms; count++;
		});
		if (count > 0)
			average = average/count;
		$scope.data[1][0] = average.toFixed(2);
		$scope.$applyAsync();
	});

	firebase.database().ref('test_history/post/dynamodb/large').on('value', function(snapshot){
		var average = 0, count = 0;
		snapshot.forEach(function(childSnapshot){
			average += childSnapshot.val().time_ms; count++;
		});
		if (count > 0)
			average = average/count;
		$scope.data[1][1] = average.toFixed(2);
		$scope.$applyAsync();
	});

	firebase.database().ref('test_history/get/dynamodb/small').on('value', function(snapshot){
		var average = 0, count = 0;
		snapshot.forEach(function(childSnapshot){
			average += childSnapshot.val().time_ms; count++;
		});
		if (count > 0)
			average = average/count;
		$scope.data[1][2] = average.toFixed(2);
		$scope.$applyAsync();
	});

	firebase.database().ref('test_history/get/dynamodb/large').on('value', function(snapshot){
		var average = 0, count = 0;
		snapshot.forEach(function(childSnapshot){
			average += childSnapshot.val().time_ms; count++;
		});
		if (count > 0)
			average = average/count;
		$scope.data[1][3] = average.toFixed(2);
		$scope.$applyAsync();
	});

	firebase.database().ref('test_history/update/dynamodb/small').on('value', function(snapshot){
		var average = 0, count = 0;
		snapshot.forEach(function(childSnapshot){
			average += childSnapshot.val().time_ms; count++;
		});
		if (count > 0)
			average = average/count;
		$scope.data[1][4] = average.toFixed(2);
		$scope.$applyAsync();
	});

	firebase.database().ref('test_history/update/dynamodb/large').on('value', function(snapshot){
		var average = 0, count = 0;
		snapshot.forEach(function(childSnapshot){
			average += childSnapshot.val().time_ms; count++;
		});
		if (count > 0)
			average = average/count;
		$scope.data[1][5] = average.toFixed(2);
		$scope.$applyAsync();
		console.log($scope.data)
	});

	firebase.database().ref('test_history/post/firebase/small').on('value', function(snapshot){
		var average = 0, count = 0;
		snapshot.forEach(function(childSnapshot){
			average += childSnapshot.val().time_ms; count++;
		});
		if (count > 0)
			average = average/count;
		$scope.data[2][0] = average.toFixed(2);
		$scope.$applyAsync();
	});

	firebase.database().ref('test_history/post/firebase/large').on('value', function(snapshot){
		var average = 0, count = 0;
		snapshot.forEach(function(childSnapshot){
			average += childSnapshot.val().time_ms; count++;
		});
		if (count > 0)
			average = average/count;
		$scope.data[2][1] = average.toFixed(2);
		$scope.$applyAsync();
	});

	firebase.database().ref('test_history/get/firebase/small').on('value', function(snapshot){
		var average = 0, count = 0;
		snapshot.forEach(function(childSnapshot){
			average += childSnapshot.val().time_ms; count++;
		});
		if (count > 0)
			average = average/count;
		$scope.data[2][2] = average.toFixed(2);
		$scope.$applyAsync();
	});

	firebase.database().ref('test_history/get/firebase/large').on('value', function(snapshot){
		var average = 0, count = 0;
		snapshot.forEach(function(childSnapshot){
			average += childSnapshot.val().time_ms; count++;
		});
		if (count > 0)
			average = average/count;
		$scope.data[2][3] = average.toFixed(2);
		$scope.$applyAsync();
	});

	firebase.database().ref('test_history/update/firebase/small').on('value', function(snapshot){
		var average = 0, count = 0;
		snapshot.forEach(function(childSnapshot){
			average += childSnapshot.val().time_ms; count++;
		});
		if (count > 0)
			average = average/count;
		$scope.data[2][4] = average.toFixed(2);
		$scope.$applyAsync();
	});

	firebase.database().ref('test_history/update/firebase/large').on('value', function(snapshot){
		var average = 0, count = 0;
		snapshot.forEach(function(childSnapshot){
			average += childSnapshot.val().time_ms; count++;
		});
		if (count > 0)
			average = average/count;
		$scope.data[2][5] = average.toFixed(2);
		$scope.$applyAsync();
		console.log($scope.data)
	});

	firebase.database().ref('test_history/post/couchdb/small').on('value', function(snapshot){
		var average = 0, count = 0;
		snapshot.forEach(function(childSnapshot){
			average += childSnapshot.val().time_ms; count++;
		});
		if (count > 0)
			average = average/count;
		$scope.data[3][0] = average.toFixed(2);
		$scope.$applyAsync();
	});

	firebase.database().ref('test_history/post/couchdb/large').on('value', function(snapshot){
		var average = 0, count = 0;
		snapshot.forEach(function(childSnapshot){
			average += childSnapshot.val().time_ms; count++;
		});
		if (count > 0)
			average = average/count;
		$scope.data[3][1] = average.toFixed(2);
		$scope.$applyAsync();
	});

	firebase.database().ref('test_history/get/couchdb/small').on('value', function(snapshot){
		var average = 0, count = 0;
		snapshot.forEach(function(childSnapshot){
			average += childSnapshot.val().time_ms; count++;
		});
		if (count > 0)
			average = average/count;
		$scope.data[3][2] = average.toFixed(2);
		$scope.$applyAsync();
	});

	firebase.database().ref('test_history/get/couchdb/large').on('value', function(snapshot){
		var average = 0, count = 0;
		snapshot.forEach(function(childSnapshot){
			average += childSnapshot.val().time_ms; count++;
		});
		if (count > 0)
			average = average/count;
		$scope.data[3][3] = average.toFixed(2);
		$scope.$applyAsync();
	});

	firebase.database().ref('test_history/update/couchdb/small').on('value', function(snapshot){
		var average = 0, count = 0;
		snapshot.forEach(function(childSnapshot){
			average += childSnapshot.val().time_ms; count++;
		});
		if (count > 0)
			average = average/count;
		$scope.data[3][4] = average.toFixed(2);
		$scope.$applyAsync();
	});

	firebase.database().ref('test_history/update/couchdb/large').on('value', function(snapshot){
		var average = 0, count = 0;
		snapshot.forEach(function(childSnapshot){
			average += childSnapshot.val().time_ms; count++;
		});
		if (count > 0)
			average = average/count;
		$scope.data[3][5] = average.toFixed(2);
		$scope.$applyAsync();
		console.log($scope.data)
	});


});