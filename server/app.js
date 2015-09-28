var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'development'
}

process.on("uncaughtException", function(error, stack){
	console.log("Uncaught Error");
	console.log(error.stack);
});

var conf = require('./configure');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');
app.locals.delimiters = '<% %>';

// Database connection
var mongoose = require('mongoose');
mongoose.connect(conf.mongo_config.connect_string(), { db: { safe:true } }, function(err){
  if (err) {
    throw err;
  }
  else {
    console.log('Mongoose Connected');
  }
});

mongoose.connection.on("error", function(err){
  console.log("Mongoose error:", err);
});

mongoose.connection.on("disconnected", function(){
  console.log("Mongoose disconnected!");
});

mongoose.set('debug', true);

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
	res.send('irondevhackathon-j9');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
