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
// CSRF 
var csrf = require('csurf');
// Express upload files
var fileUploads = require('express-fileupload')

// Add compression to app for performance
var compression = require('compression')

var express = require('express')
var app = express()

// Routes
var index = require('./routes/index');
var dbapi = require('./routes/dbapi'); // Contains the routes to access and modify DB data
var autocompleteapi = require('./routes/autocompletes'); // Contains the routes to access and modify DB data
var newitemsapi = require('./routes/newitemsapi'); // Contains the routes to divs that add new items (templates)
var menuapi = require('./routes/menu'); // Routes for the main menu
var btnsetup = require('./routes/btn-setup'); // Routes for the setup buttons, when editing details of a line
var uploadapi = require('./routes/uploadapi'); // upload API for uploading files to server
var reportapi = require('./routes/reportapi'); // Reporting engine
var warehouse_actions = require('./routes/warehouse_actions'); // Actions in warehouse stock such as inventory issue notes etc

// App config
var config = require('./appconfig.js') // Application configuration

// Helmet for enhanced security as from express site tutorials
var helmet = require('helmet')

var app = express();

// Make some variables available globally
app.locals.logo = config.applogo;
app.locals.report_logo = config.report_logo;
app.locals.company_name = config.company_name;

// Add moment  to app to manipulate dates and time
app.locals.moment = require('moment');

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.set('views', [ path.join(__dirname, 'views'), path.join(__dirname, 'reports') ]); // Add 2 view dirs
app.set('view engine', 'pug');

// Use compression for better performance
app.use(compression())

// File uploads
app.use(fileUploads())

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Use helmet in app
app.use(helmet())

// Public dir express app
app.use(express.static(path.join(__dirname, 'public')));
// Public dir reports, exposes public stuff (CSS etc) for reports section
app.use('/public_rep', express.static(path.join(__dirname, 'reports_public')));

// Setup session handling 
app.use(session({
    secret: 'sasl76324mnasb_sdfsds*anmsbda',
    //cookie: { maxAge: parseInt(config.session_time) }, // 240 minutes session - 1 minute = 60000 millisec 
    cookie: { maxAge: config.session_time }, 
    // create new redis store.
    //store: new RedisStore({ host: 'localhost', port: 6379, client: client, ttl : 260}),
    store: new RedisStore(),
    saveUninitialized: false,
    resave: false,
    rolling: true,
    unset: 'destroy',
	})
);

// Add CSRF for app
app.use(csrf());

app.use(function(req, res, next) {
  res.locals._csrf = req.csrfToken();
  next();
});

// Expose sessions to all views so we can use them anywhere by calling session.<var>
app.use(function(req,res,next){
    res.locals.session = req.session;
    next();
});

// This functon is a global one to test session. It will test session on every page except the ones listed
// in the arrnosessiontest array. these are excluded as they do not need testing
// They are auth functions and if session test is enabled in these pages the app will go in a loop
var session_test = function (req, res, next) {
	var arrnosessiontest = 
		[
		'/', 
		'/?expired=true', 
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
	
	// Redirect always to index with error displayed when session is invalid
	// Mainly used when cleint tries to access other pages in the app without having gone through auth page
	if (testsession == true && (req.session.loggedin == false || typeof req.session.loggedin == 'undefined')) {
         res.redirect('/?expired=true');
    } else{
        next();
    }
}
// Use the session_test function in our application
app.use(session_test)

// Base route
app.use('/', index);
// Add API Route keeps logic clean
// Database actions
app.use('/api/db', dbapi);
// New items actions
app.use('/new_item', newitemsapi);
// Menu action
app.use('/menu', menuapi)
// Autocompletes for tables
app.use('/autocompletes', autocompleteapi)
// Routes for the btn-setup, for editing the details of a line
app.use('/btn-setup', btnsetup)
// Upload files api
app.use('/api/upload', uploadapi)
// Reporting engine
app.use('/reports', reportapi)
// Warehouse actions
app.use('/wh', warehouse_actions)

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
