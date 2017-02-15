var express = require('express');
var router = express.Router();
var db = require('../db.js');
var config = require('../appconfig');

// Session handler for ALL pages so we not have any forgery done
/*router.get('/*', function (req, res, next) {
	if (typeof req.session === "undefined") {
		res.render('index', { title: 'Greencity', expired: true, full_logo: config.full_logo })
		next()		
	}
})*/

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(req.query.loggedout)
	res.render('index', { title: 'Greencity', full_logo: config.full_logo, loggedout: req.query.loggedout })
});

// Main page after login
router.get('/main/menugroup/:menugroup', function (req, res, next) {
	if (req.session.loggedin == true) {
		// We are passing the session so we can use in Jade templates. Not correct as we need global function to do this. To be studied
		// We also pass the parameter menu group whcih comes from the desktop.
		// This is the id column in menu group which we will then use to filter the left menu items to show only the ones of the group
		
		console.log(req.params.menugroup)
		res.render('main', { title: config.company_name + ' Admin Console', logo: config.applogo, session: req.session, menugroup: req.params.menugroup }) 
	} else {
		// Redirect to main page if no session..
		res.render('index', { title: config.company_name, expired: true, full_logo: config.full_logo })	
	}	
})

// Desktop Page
router.get('/desktop', function (req, res, next) {
	if (req.session.loggedin == true) {
		db.query("select * from menu_groups where mgactive=true and mgid in (select mgroup from menu where mid in (select unnest(regexp_split_to_array(lpermissions, ',')::int[]) \
					from login where lid=$1)) order by mgorder", [req.session.user_id], function (err, result) {
			res.render('desktop', { desktop: result.rows, title: config.company_name + ' Desktop', logo: config.applogo, session: req.session })		
		})		
	} else {
		// Redirect to main page if no session..
		res.render('index', { title: config.company_name, expired: true, full_logo: config.full_logo })	
	}	
})

router.post('/auth', function (req, res, next) { // Pass the pool object so it can be used in the function
	// Authenticate user against DB
	db.query("SELECT lid, ldescription from login where lusername=$1 and lpassword=$2 and lactive=true", [req.body.username, req.body.pw], function (err, result) {
		if(result.rows.length == 1) {
			req.session.loggedin = true;
			req.session.user_id = result.rows[0].lid;
			req.session.user_description = result.rows[0].ldescription;
			// Found User
			res.send("OK");
		} else {
			// No user
			res.send("NOTOK");
		}
	})
})

// Swtup the desktop with icons
//router.post('/desktop', function (req, res, next) {
	//db.query("select * from menu_groups ")
//})

// Logout from system
router.get('/logout', function (req, res, next) {
	// Destroy active session
	req.session.destroy();
	// Temporary point to index. Then implement authentication
	// res.render('index', { title: config.company_name, full_logo: config.full_logo, loggedout: true })
	// After destroying session
	res.redirect('/?loggedout=true')
})

module.exports = router;
