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

var index = require('./routes/index');
var users = require('./routes/users');
var dbapi = require('./routes/dbapi'); // Container the routes to access and modify DB data
var newitemsapi = require('./routes/newitemsapi'); // Contains the routes to divs that add new items (templates)
var menuapi = require('./routes/menu'); // Routes for the main menu
var config = require('./appconfig.js') // Application configuration

// Helmet for enhanced security as from express site tutorials
var helmet = require('helmet')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Use compression for better performance
app.use(compression())

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Use helmet in app
app.use(helmet())

app.use(express.static(path.join(__dirname, 'public')));

// Setup session handling 
app.use(session({
    secret: 'sasl76324mnasb_sdfsds*anmsbda',
    cookie: { maxAge: config.session_time }, // 240 minutes session - 1 minute = 60000 millisec 
    // create new redis store.
    store: new RedisStore({ host: 'localhost', port: 6379, client: client, ttl : 260}),
    saveUninitialized: false,
    resave: false
}));

// Global session handler mimddleware
/*app.use(function(req, res, next) {
    if (req.session.loggedin == null) {
        //res.render('index', { title: 'Greencity', expired: true, full_logo: config.full_logo })
         res.redirect('http://gctl.mac');
    }   else{
        next();
    }
});*/


// This functon is a global one to test session. It will test session on every page except the ones listed
// in the arrnosessiontest array. these are excluded as they do not need testing
// They are auth functions and if session test is enabled in these pages the app will go in a loop

var session_test = function (req, res, next) {
	var arrnosessiontest = 
		[
		'/', '/?expired=true', 
		'/?wrongcred=true', 
		'/scripts/nprogress/nprogress.js', 
		'/auth', 
		'/logout'
		];
		
	var testsession = true;
	for (var u = 0; u < arrnosessiontest.length; u++) {
		if (req.url == arrnosessiontest[u]) {
			testsession = false;	
			break;
		}
	}
	
	// redirect always to index with error displayed when session is invalid
	// Mainly used when cleint tries to access other pages in the app without having gone through auth page
	if (testsession == true && (req.session.loggedin == false || typeof req.session.loggedin == 'undefined')) {
         res.redirect('/?expired=true');
    } else{
        next();
    }
}
// Use the session_test function in our application
app.use(session_test)

app.use('/', index);
app.use('/users', users);
// Add API Route keeps logic clean
// Database actions
app.use('/api/db', dbapi);
// New items actions
app.use('/new_item', newitemsapi);
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