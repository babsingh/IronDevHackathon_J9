// Server Configuration - Shared configuration between dev and production
var conf = {};

// Development configuration
if (process.env.NODE_ENV === 'development') {

	conf.mongo_config = {
		'dbname' : 'irondevhackathon-j9-dev',
		'host' : 'localhost',
		'port' : 27017,
		'auth' : {
			'name': '',
			'pass': ''
		},
		connect_string: function(){
			return 'mongodb://' + this.host + ':' + this.port + '/' + this.dbname;
		}
	};

}

// Production configuration
if (process.env.NODE_ENV === 'production') {

	conf.mongo_config = {
		'dbname' : 'irondevhackathon-j9-prod',
		'host' : 'some.prod.db',
		'port' : 12345,
		'auth' : {
			'name': '',
			'pass': ''
		},
		connect_string: function(){
			return 'mongodb://' + this.host + ':' + this.port + '/' + this.dbname;
		}
	};

}

module.exports = conf;
