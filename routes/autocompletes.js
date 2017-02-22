var express = require('express');
var router = express.Router();
var db = require('../db.js');

// For node pg you have to concatenate the % in the string as if you do not the parameter placeholder will be treated like a string and the query fail 
// When sending back data to the autocomplete the output has to be always as label and value

// Warehouse Items 
router.get('/warehouse_items', function (req, res, next) {
	db.query("select wisku || ' - ' || widescription as label, wiid as value, wuunit as unit from warehouse_items left join warehouse_units on wi_unit=wuid where (upper(widescription) like '%' || upper($1) || '%' or upper(wisku) like '%' || upper($1) || '%')", [req.query.term], function (err, result) {
		res.json(result.rows)
	})
})

// Warehouses 
router.get('/warehouses', function (req, res, next) {
	db.query("select wdescription as label, wid as value from warehouses where upper(wdescription) like '%' || upper($1) || '%'", [req.query.term], function (err, result) {
		res.json(result.rows)
	})
})

// Users 
router.get('/users', function (req, res, next) {
	db.query("select ldescription as label, lid as value from login where upper(ldescription) like '%' || upper($1) || '%'", [req.query.term], function (err, result) {
		res.json(result.rows)
	})
})

module.exports = router;