var express = require('express');
var router = express.Router();
var db = require('../db.js');
var config = require('../appconfig');

// User permissions
router.get('/user_permissions/param/:param', function (req, res, next) {
	// Get all perms available. Basically its all the items in the menu table
	db.query('select mid, mdescription from menu order by mgroup, morder', function (err, result) {
		db.query('select lpermissions, ldescription from login where lid=$1', [req.params.param], function (err, result2) {
			// For user permission we are going to pass the lpermissions column which is actually a comma separated field in the DB that can be iterated through
			res.render('btn-setup/user_permissions', { 
				menu: result.rows,  // All permissions available
				userperms: result2.rows[0].lpermissions,  // Permissions of this user
				title: 'Setup User Permissions',  // Page title
				username: result2.rows[0].ldescription, // Username of the selected user,
				userid: req.params.param // login table ID of the selected user
			}); 
		})	
	})
})

router.get('/add_to_goods_received_note/param/:param', function (req, res, next) {
	res.render('btn-setup/add_to_goods_received_note.pug', {
		title: 'Add items to Goods Received Notes',	
		gin: req.params.param,
	})
})

module.exports = router;