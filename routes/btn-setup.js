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

// Add stock items to goods issued notes
router.get('/add_to_goods_received_note/param/:param', function (req, res, next) {
	db.query('select * from vw_goods_issued_notes_details where gind_ginid=$1', [req.params.param], function (err, result) {
		res.render('btn-setup/add_to_goods_received_note.pug', {
			title: 'Add items to Goods Received Notes',	
			ginid: req.params.param,
			items: result.rows,
		})
	})
})

// Set per user permissions for a single menu item (usefull when just created it)
router.get('/single_permission_per_user/param/:param', function (req, res, next) {
	db.query('select lid, ldescription, lpermissions from login order by ldescription', function (err, result) {
		res.render('btn-setup/single_permission_per_user', {
				users: result.rows,
				menu_id: req.params.param, // Send the id of the menu item to page so we can compare with the permissions of user and check the input checkbox
				title: 'Assign this permission to a user:'		
		})
	})
})

module.exports = router;