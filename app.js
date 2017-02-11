var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('./db.js');
//Redis for sessions
var redis  = require("redis");
var session = require("express-session");
var RedisStore = require('connect-redis')(session);
var client  = redis.createClient();

// Add compression to app for performance
var compression = require('compression')

var express = require('express')
var app = express()

// Use compression for better performance
app.use(compression())

var index = require('./routes/index');
var users = require('./routes/users');
var dbapi = require('./routes/dbapi'); // Container the routes to access and modify DB data
var itemsapi = require('./routes/itemsapi'); // Contains the routes to divs that add new items (templates)
var menuapi = require('./routes/menu'); // Routes for the main menu

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Setup session handling 
app.use(session({
    secret: 'sasl76324mnasb_sdfsds*anmsbda',
    cookie: { maxAge: 120 * 60 * 60 * 1000 }, // 120 minutes session 
    // create new redis store.
    store: new RedisStore({ host: 'localhost', port: 6379, client: client, ttl : 260}),
    saveUninitialized: false,
    resave: false
}));

app.use('/', index);
app.use('/users', users);
// Add API Route keeps logic clean
// Database actions
app.use('/api/db', dbapi);
// New items actions
app.use('/api/new_item', itemsapi);
// Menu action
app.use('/menu', menuapi)

// Add scripts for use in html code
app.use('/scripts', express.static(__dirname + '/node_modules/'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
