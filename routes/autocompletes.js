var express = require('express');
var router = express.Router();
var db = require('../db.js');

// For node pg you have to concatenate the % in the string as if you do not the parameter placeholder will be treated like a string and the query fail 
// When sending back data to the autocomplete the output has to be always as label and value

// Warehouse Items 
router.get('/warehouse_items', function (req, res, next) {
	db.query("select wisku || ' - ' || widescription as label, wiid as value, wuunit as unit from vw_warehouse_items lwhere (widescription ilike '%' || $1 || '%' or wisku ilike '%' || $1 || '%')", [req.query.term], function (err, result) {
		res.json(result.rows)
	})
})

// Warehouse Items - filtered
router.get('/warehouse_items/filter/:filter/filterval/:filterval', function (req, res, next) {
	db.query("select wisku || ' - ' || widescription as label, wiid as value, wuunit as unit from vw_warehouse_items where " + request.params.afilter + "=$2 (widescription ilike '%' || $1 || '%' or wisku ilike '%' || $1 || '%') and ", [req.query.term, request.params.afilterval], function (err, result) {
		res.json(result.rows)
	})
})

// Warehouse Units 
router.get('/warehouse_units', function (req, res, next) {
	db.query("select wuunit as label, wuid as value from warehouse_units where (wuunit ilike '%' || $1 || '%')", [req.query.term], function (err, result) {
		res.json(result.rows)
	})
})

// Warehouses 
router.get('/warehouses', function (req, res, next) {
	db.query("select wdescription as label, wid as value from warehouses where wdescription ilike '%' || $1 || '%'", [req.query.term], function (err, result) {
		res.json(result.rows)
	})
})

// Users 
router.get('/users', function (req, res, next) {
	db.query("select ldescription as label, lid as value from login where ldescription ilike '%' || $1 || '%'", [req.query.term], function (err, result) {
		res.json(result.rows)
	})
})

// Equipment (only description)
router.get('/equipment', function (req, res, next) {
	db.query("select edescription as label, eid as value from equipment where edescription ilike '%' || $1 || '%'", [req.query.term], function (err, result) {
		res.json(result.rows)
	})
})

// Equipment with number plate
router.get('/equipment_with_plateno', function (req, res, next) {
	db.query("select enumberplate || ' - ' || edescription as label, eid as value from equipment where edescription ilike '%' || $1 || '%' or upper(enumberplate) ilike '%' || $1 || '%'", [req.query.term], function (err, result) {
		res.json(result.rows)
	})
})

// Equipment (only description)
router.get('/equipment_models', function (req, res, next) {
	db.query("select emdescription as label, emid as value from equipment_models where emdescription ilike '%' || $1 || '%'", [req.query.term], function (err, result) {
		res.json(result.rows)
	})
})

// Desktop icon types
router.get('/menu_groups', function (req, res, next) {
	db.query("select mgid as value, mgdescription as label from menu_groups where mgdescription ilike '%' || $1 || '%'", [req.query.term], function (err, result) {
		res.json(result.rows)
	})
})

module.exports = router;