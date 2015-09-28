// Constants for the API

angular.module('irondev-j9.services')

.factory('API', function(){

	// Url of Node API
	var apiUrl = 'http://j9hack.mybluemix.net/api';

	// Base Routes
	var baseUserRoute = apiUrl + '/user';

	return {

		// User Routes
		user: {
			get: baseUserRoute + '/get'
			, create: baseUserRoute + '/create'
			, login: baseUserRoute +'/login'
		}

	}

});
