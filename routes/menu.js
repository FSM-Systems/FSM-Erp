var express = require('express');
var router = express.Router();
var db = require('../db.js');
var config = require('../appconfig');

// Load main left menu
router.get('/mainmenu/menugroup/:menugroup', function (req, res, next) {
	// Create the main menu from DB based on permissions of user
	db.query("select * from vw_menu_setup where mactive=true \
				and mgroup=$2 and mid=any (select unnest(regexp_split_to_array(lpermissions, ',')::int[]) \
				from login where lid=$1) order by morder", [req.session.user_id, req.params.menugroup], function (err, result) { // Main menu based on permissions and menugroup
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


router.get('/system_menu_setup', function (req, res, next) {
	db.query('select * from vw_menu_setup order by morder', function (err, result) {
		res.render('system_menu_setup', { menu: result.rows, pagename: 'Menu Options Management' })	
	})
})


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
	db.query('select * from vw_equipment_setup', function (err, result) {
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
	// Items
	db.query('select * from vw_warehouse_items order by wiid', function (err, result) {
		res.render('warehouse_items_setup', { whi: result.rows, pagename: 'Warehouse Items Setup' })
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
	db.query('select * from vw_warehouse_stock', function (err, result) {
		res.render('in_stock_items', { title: 'WAREHOUSE STOCK', stock: result.rows });
	})
})

// Goods issue note
router.get('/goods_issue_notes', function (req, res, next) {
	db.query('select * from vw_goods_issued_notes', function (err, result) {
		res.render('goods_issue_notes', { title: 'GOODS ISSUE NOTE', gin: result.rows });
	})
})

// Suppliers
router.get('/suppliers', function (req, res, next) {
	db.query('select * from suppliers order by sname', function (err, result) {
		res.render('suppliers', { title: 'SUPPLIERS', suppliers: result.rows });
	})
})

// Fuel Register
router.get('/fuel_records', function (req, res, next) {
	db.query('select * from vw_fuel_register', function (err, result) {
		res.render('fuel_records', { title: 'FUEL RECORDS', fuel: result.rows });
	})
})

// Fuel Register
router.get('/fuel_reports', function (req, res, next) {
	res.render('fuel_reports', { title: 'FUEL REPORTS' });
})

// Import from excel
router.get('/import_from_excel', function (req, res, next) {
	res.render('import_from_excel')
})

// Import from excel confirm page
router.get('/import_from_excel_confirm', function (req, res, next) {
	db.query('select * from warehouse_stock_import_temporary where user_id=$1', [req.session.user_id], function (err, result) {
		// Display imported stuff and prompt user to confirm warehouse and confirm insertion to database
		res.render('import_from_excel_confirm', { items: result.rows })
	})
})

// Check user actions. See who hjas done what in the app
router.get('/check_user_actions', function (req, res, next) {
	db.query('select * from vw_user_actions', function (err, result) {
		res.render('check_user_actions', {
			actions: result.rows	
		})	
	})
})

module.exports = router;