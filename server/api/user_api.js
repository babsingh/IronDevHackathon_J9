// User Api

var express = require('express');
var userApi	= express.Router();
var userRoute = require('../routes/user_routes');
var RouteAuth = require('../util/route_auth');

// Base user api routes
userApi.post('/create', userRoute.create);
userApi.post('/login', userRoute.login);
userApi.get('/get', RouteAuth.protect, userRoute.get);

module.exports = userApi;
