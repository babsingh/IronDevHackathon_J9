angular.module('app.controllers', [])

	.controller('LoginCtrl', function($scope, $state, $ionicLoading, $ionicPopup, API) {
	    $scope.data = {};
	 
		$scope.showAlert = function(msg) {
		    $ionicPopup.alert({
			    title: msg.title,
			    template: msg.message,
			    okText: 'Cool',
			    okType: 'button-assertive'
			});
		};

	    $scope.login = function() {
	        API.login($scope.data.username, $scope.data.password).then(function(data) {
	        	if (data.data.status == 'success') {
	        		$scope.showAlert({
				        title: "Success",
				        message: "Logged in"
			        });
			        $state.go('home');
	        	} else {
	        		$scope.showAlert({
				        title: "Failed",
				        message: "Incorrect input"
			        });
			        $state.go('login');
	        	}
	        });
	    };
	})

	.controller('SignupCtrl', function($scope, $state, $ionicLoading, $ionicPopup, API) {
	    $scope.data = {};
	 
		$scope.showAlert = function(msg) {
		    $ionicPopup.alert({
			    title: msg.title,
			    template: msg.message,
			    okText: 'Cool',
			    okType: 'button-assertive'
			});
		};

	    $scope.signup = function() {
	        API.signup($scope.data.username, $scope.data.password, $scope.data.fullname).then(function(data) {
	        	if (data.data.status == 'success') {
	        		$scope.showAlert({
				        title: "Success",
				        message: "Logged in"
			        });
			        $state.go('home');
	        	} else {
	        		$scope.showAlert({
				        title: "Failed",
				        message: "Incorrect input"
			        });
			        $state.go('signup');
	        	}
	        });
	    };
	});