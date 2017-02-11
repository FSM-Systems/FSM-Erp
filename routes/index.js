var express = require('express');
var router = express.Router();
var db = require('../db.js');
var config = require('../appconfig');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Greencity', full_logo: config.full_logo })
});

// Main page after login
router.get('/main', function (req, res, next) {
	if (req.session.loggedin == true) {
		res.render('main', { title: 'Greencity Admin Console', logo: config.applogo, session: req.session }) // We are passing the session so we can use in Jade templates. Not correct as we need global function to do this. To be studied
	} else {
		// Redirect to main page if no session..
		res.render('index', { title: 'Greencity', expired: true, full_logo: config.full_logo })	
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
			req.session.loggedin = false;
			res.send("NOTOK");
		}
	})
})

// Logout from system
router.get('/logout', function (req, res, next) {
	// Destroy active session
	req.session.destroy();
	// Temporary point to index. Then implement authentication
	res.render('index', { title: 'Greencity', full_logo: config.full_logo, loggedout: true })
})

module.exports = router;
