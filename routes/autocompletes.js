var express = require('express');
var router = express.Router();
var db = require('../db.js');

// For node pg you have to concatenate the % in the string as if you do not the parameter placeholder will be treated like a string and the query fail 
// When sending back data to the autocomplete the output has to be always as label and value

// Warehouse Items 
router.get('/warehouse_items', function (req, res, next) {
	db.query("select widescription as label, wiid as value from warehouse_items where upper(widescription) like '%' || upper($1) || '%'", [req.query.term], function (err, result) {
		res.json(result.rows)
	})
})

// Warehouses 
router.get('/warehouses', function (req, res, next) {
	db.query("select wdescription as label, wid as value from warehouses where upper(wdescription) like '%' || upper($1) || '%'", [req.query.term], function (err, result) {
		res.json(result.rows)
	})
})

module.exports = router;