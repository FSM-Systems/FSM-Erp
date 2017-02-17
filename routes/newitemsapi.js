var express = require('express');
var router = express.Router();
var db = require('../db.js');
var config = require('../appconfig');

// New system user
router.get('/new_system_user', function (req, res, next) {
	res.render('new_item/new_system_user', { title: 'ADD A NEW SYSTEM USER'} );
})

// New equipment
router.get('/new_equipment', function (req, res, next) {
	res.render('new_item/new_equipment', { title: 'ADD A NEW EQUIPMENT'} );
})

// New menu item
router.get('/new_system_menu_config', function (req, res, next) {
	db.query('select mgid, mgdescription from menu_groups order by mgdescription', function (err, result) {
		res.render('new_item/new_system_menu_config', { title: 'ADD A NEW MENU ITEM', menugroups: result.rows} );
	})
})

// New desktop icon
router.get('/new_desktop_icon', function (req, res, next) {
	res.render('new_item/new_desktop_icon', { title: 'ADD A NEW DESKTOP ICON'} );
})

// New warehouse 
router.get('/new_warehouse', function (req, res, next) {
	res.render('new_item/new_warehouse', { title: 'ADD A NEW WAREHOUSE'} );
})

// New warehouse unit
router.get('/new_warehouse_unit', function (req, res, next) {
	res.render('new_item/new_warehouse_unit', { title: 'ADD A NEW UNIT'} );
})

// New warehouse item (Stock article)
router.get('/new_warehouse_item', function (req, res, next) {
	// Send list of Equipments already registered and units for creation of new item
	db.query('select emid, emdescription from equipment_models order by emdescription', function (err, result) {
		db.query('select wuid, wuunit from warehouse_units order by wuunit', function (err, result2) {
			res.render('new_item/new_warehouse_item', { equip_models: result.rows, units: result2.rows, title: 'ADD A NEW ITEM FOR STOCK'} );
		})
	})
})

// New equipment model 
router.get('/new_equipment_model', function (req, res, next) {
	res.render('new_item/new_equipment_model', { title: 'ADD A NEW EQUIPMENT MODEL'} );
})

// New stock model 
router.get('/new_in_stock_item', function (req, res, next) {
	res.render('new_item/new_in_stock_item', { title: 'ADD SINGLE STOCK ITEM TO WAREHOUSE'} );
})

// New goods issue note
router.get('/new_goods_issue_note', function (req, res, next) {
	res.render('new_item/new_good_issue_note', { title: 'CREATE NEW GOODS ISSUE NOTE' } );
})

module.exports = router;