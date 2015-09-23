angular.module('app.services', [])

	.factory('API', function($http) {
		var api = {};
		var baseURL = 'Bluemix-App-URL';

		api.login = function(username, password) {
			return $http.post(baseURL + '/login', {
			  "username": username,
			  "password": password
			});
		};

		api.signup = function(username, password, fullname) {
			return $http.post(baseURL + '/signup', {
			  "username": username,
			  "password": password,
			  "fullname": fullname
			});
		};

		return api;
	})