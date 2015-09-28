// Create Profile Ctrl

angular.module('irondev-j9.controllers')

.controller('CreateProfileCtrl', function($scope, $state, $ionicPopup, User, Storage){

	console.log('CreateProfileCtrl');
	$scope.profileForm = {};

	$scope.createProfile = function(){

		User.create($scope.profileForm).then(
			function(createdUser){
				Storage.set('authToken', createdUser.authToken);
				$state.go('get-started.user-created');
			},
			function(err){
				$ionicPopup.alert({
					title: 'Signup Error',
					template: err.message
				});
			});

	};

});
