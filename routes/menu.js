var express = require('express');
var router = express.Router();
var db = require('../db.js');
var config = require('../appconfig');

// Load main left menu
router.get('/mainmenu/menugroup/:menugroup', function (req, res, next) {
	// Create the main menu from DB based on permissions of user
	db.query("select * from menu where mactive=true \
					and mgroup=$2 and mid=any (select unnest(regexp_split_to_array(lpermissions, ',')::int[]) \
					from login where lid=$1) order by morder", [req.session.user_id, req.params.menugroup], function (err, result) { // Main menu based on permissions and menugroup
		// Send to client as JSON
		res.render('mainmenu', { menuitems: result.rows });
	})	
})

//System user menu option
router.get('/system_users_setup', function (req, res, next) {
	// Get all users and load in table on page
	db.query('select * from login order by lid', function (err, result) {
		res.render('system_users_setup', { sysusers: result.rows, pagename: 'System Users Management' })
	})
})

// Menu user menu option
router.get('/system_menu_setup', function (req, res, next) {
	// Get all users and load in table on page
	db.query('select * from menu order by morder', function (err, result) {
		db.query('select * from menu_groups order by mgdescription', function (err, result2) {
			res.render('system_menu_setup', { menu: result.rows, groups: result2.rows, pagename: 'Menu Options Management' })
		})
	})
});

// Desktop Items menu option (menu_groups)
router.get('/desktop_icons_setup', function (req, res, next) {
	// Get all users and load in table on page
	db.query('select * from menu_groups order by mgorder', function (err, result) {
		res.render('desktop_icons_setup', { di: result.rows, pagename: 'Desktop Icons Setup' })
	})
});

// Equipment user menu option
router.get('/equipment_setup', function (req, res, next) {
	// Get all users and load in table on page
	db.query('select eid, enumberplate, edescription, \
			to_char(eroadlicense, \'dd/mm/yyyy\') as eroadlicense,\
			to_char(einsurance, \'dd/mm/yyyy\') as einsurance,\
			to_char(etra, \'dd/mm/yyyy\') as etra, \
			to_char(epurchased, \'dd/mm/yyyy\') as epurchased \
			from equipment order by eid', function (err, result) {
		res.render('equipment_setup', { equipment: result.rows, pagename: 'Equipment Management' })
	})
})

// New equipment model 
router.get('/equipment_models', function (req, res, next) {
	// Send list of Equipments already registered
	db.query('select emid, emdescription from equipment_models order by emdescription', function (err, result) {
		// Items for select list
		res.render('equipment_models', { equip_models: result.rows, title: 'Equipment Models' } );
	})
})

// Warehouse menu option
router.get('/warehouse_setup', function (req, res, next) {
	// Get all users and load in table on page
	db.query('select * from warehouses order by wid', function (err, result) {
		res.render('warehouse_setup', { wh: result.rows, pagename: 'Warehouse Management' })
	})
});

// Configure and add new warehouse Items
router.get('/warehouse_items_setup', function (req, res, next) {
	function renderit() {
		
	}
	// prepare data for template
	// Items
	db.query('select * from warehouse_items order by wiid', function (err, result) {
		// Units
		db.query('select * from warehouse_units order by wuid', function (err, result2) {
			// Models
			db.query('select * from equipment_models order by emid', function (err, result3) {
				res.render('warehouse_items_setup', { whi: result.rows, units: result2.rows, models: result3.rows, pagename: 'Warehouse Items Setup' })
			})
		})
	})
});

// Configure and add new warehouse units (Piece Kilo etc etc)
router.get('/warehouse_units_setup', function (req, res, next) {
	// Get all users and load in table on page
	db.query('select * from warehouse_units order by wuid', function (err, result) {
		res.render('warehouse_units_setup', { units: result.rows, pagename: 'Warehouse Units Setup' })
	})
});

// User permissions
router.get('/user_permissions/param/:param', function (req, res, next) {
	// Get all perms available. Basically its all the items in the menu table
	db.query('select mid, mdescription from menu order by mgroup, morder', function (err, result) {
		db.query('select lpermissions, ldescription from login where lid=$1', [req.params.param], function (err, result2) {
			// For user permission we are going to pass the lpermissions column which is actually a comma separated field in the DB that can be iterated through
			res.render('user_permissions', { 
				menu: result.rows,  // All permissions available
				userperms: result2.rows[0].lpermissions,  // Permissions of this user
				title: 'Setup User Permissions',  // Page title
				username: result2.rows[0].ldescription, // Username of the selected user,
				userid: req.params.param // login table ID of the selected user
			}); 
		})	
	})
})

// Stock items {in_stock_tems.pug}
router.get('/in_stock_items', function (req, res, next) {
	res.render('in_stock_items');
})
module.exports = router;