var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express_session = require('express-session');

var mongoose = require('mongoose');

require('./models/user_model.js');

var routes = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var signup = require('./routes/signup');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');
app.locals.delimiters = '<% %>';

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// Process the Environment Variable - VCAP_SERVICES
var services = JSON.parse(process.env.VCAP_SERVICES);
  
// Connect to the DB
if (appEnv === 'development') {
  var connection = mongoose.connect('mongodb://localhost/j9_irondev');
} else if (appEnv === 'production') {
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


app.use(express_session({
  secret: 'SECRET',
  cookie: {maxAge: 3600*1000},
  resave: true,
  saveUninitialized: true
}));

// start server on the specified port and binding host
app.listen(appEnv.port, function() {

  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});

app.use('/', routes);
app.use('/users', users);
app.use('/login', login);
app.use('/signup', signup);

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
