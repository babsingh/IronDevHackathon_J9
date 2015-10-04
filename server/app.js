var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'development'
}

var mongoose = require('mongoose');

process.on("uncaughtException", function(error, stack){
	console.log("Uncaught Error");
	console.log(error.stack);
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');
app.locals.delimiters = '<% %>';

// Database connection
var mongoose = require('mongoose');

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// var connection = mongoose.connect('mongodb://localhost/j9_irondev');
// Connect to the DB
if (appEnv === 'development') {
  var connection = mongoose.connect('mongodb://localhost/j9_irondev');
} else if (appEnv === 'production') {
  // Process the Environment Variable - VCAP_SERVICES
  var services = JSON.parse(process.env.VCAP_SERVICES);
  var service_name = 'MongoLab-82';
  if (services[service_name]) {
    var svc = services[service_name][0].credentials;
    var connection = mongoose.connect(svc.uri);
  } else {
    console.log('The service '+service_name+' is not in the VCAP_SERVICES. Did you forget to bind it?');
  }
} else {
      err = 'Unkown environment';
}

mongoose.connection.on("error", function(err){
  console.log("Mongoose error:", err);
});

mongoose.connection.on("disconnected", function(){
  console.log("Mongoose disconnected!");
});

mongoose.set('debug', true);

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Expose-Headers', 'Content-Length');
  res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
  if (req.method === 'OPTIONS') {
    return res.send(200);
  } else {
    return next();
  }
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Api
app.use('/api', require('./api'));

app.get('/', function(req, res){
	res.send('irondevhackathon-j9-autotest1');
});

// start server on the specified port and binding host
app.listen(appEnv.port, function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
