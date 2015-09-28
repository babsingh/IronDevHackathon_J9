// Api Manifest

var express 	= require('express');
var api	= express.Router();

api.use('/user', require('./api/user_api'));

module.exports = api;
