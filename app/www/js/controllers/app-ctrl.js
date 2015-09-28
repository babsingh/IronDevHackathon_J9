// Main App Ctrl

angular.module('irondev-j9.controllers')

.controller('AppCtrl', function($scope){

	console.log('AppCtrl');

	$scope.$on('user:set', function(event, user){
		$scope.user = user;
	});

});
