var express = require('express');
var router = express.Router();
var db = require('../db.js');
var config = require('../appconfig');

/* GET home page. */
router.get('/', function(req, res, next) {
	// Send to desktop if logged in..
	if (req.session.loggedin == true) {
		res.redirect('/desktop')
	} else {
		res.render('index', { title: config.company_name, full_logo: config.full_logo, expired: req.query.expired, wrongcred: req.query.wrongcred})
	}
});

router.post('/auth', function (req, res, next) { // Pass the pool object so it can be used in the function
	// Authenticate user against DB and set session variables
	db.query("SELECT * from login where lusername=$1 and lpassword=$2 and lactive=true", [req.body.username, req.body.pw], function (err, result) {
		if (result.rows.length == 1) {
			req.session.loggedin = true;
			req.session.user_id = result.rows[0].lid;
			req.session.user_description = result.rows[0].ldescription;
			req.session.copy_paste = result.rows[0].lcopypaste;
			req.session.read_only = result.rows[0].lreadonly;
			res.send("OK"); // For jQuery
		} else {
			// No user
			res.send("NOTOK"); // For jQuery
		}
	})
})

// Desktop Page
router.get('/desktop', function (req, res, next) {
	db.query("select * from menu_groups where mgactive=true and mgid in (select mgroup from menu where mid in (select unnest(regexp_split_to_array(lpermissions, ',')::int[]) \
				from login where lid=$1)) order by mgorder", [req.session.user_id], function (err, result) {
		res.render('desktop', { desktop: result.rows, title: config.company_name + ' Desktop', logo: config.applogo, session: req.session })		
	})
})

// Main page after login
router.get('/main/menugroup/:menugroup', function (req, res, next) {
	res.render('main', { title: config.company_name, logo: config.applogo, session: req.session, menugroup: req.params.menugroup }) 
})

// Logout from system
router.get('/logout', function (req, res, next) {
	req.session.destroy();
	// Redirect to / for logging out and destroying the current session
	res.redirect('/?loggedout=true')
})

module.exports = router;
