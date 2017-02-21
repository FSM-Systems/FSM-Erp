var express = require('express');
var router = express.Router();
var db = require('../db.js');

// Update a table field
router.post('/update_db_field', function (req, res, next) {
	db.query('update ' + req.body.table + ' set ' + req.body.dbcol + '=$1 where ' + req.body.dbcolid + '=$2 returning ' + req.body.dbcolid + ' as id', [ req.body.dbcolval.trim(), req.body.dbcolidval ], function (err, result) {
    		if (err) {
    			res.send(err)
    		} else {
    			res.send("OK")	
    		}
	})
})

// Delete a row from the database table
router.post('/delete_db_field', function (req, res, next) {
	db.query('delete from ' + req.body.table + ' where ' + req.body.dbcolid + '=$1 returning ' + req.body.dbcolid + ' as id', [ req.body.dbcolidval ], function (err, result) {
    		if (err) {
    			res.send(err)
    		} else {
    			res.send("OK")	
    		}
	})
})

// Create the insert SQL from the object passed
// Object has to be cleaned from table name and retrunid before passing it here
// As values pass the object again when execute the query from the node-pg module

function create_insert_SQL(obj, table, returnid) {
	// Loop through OBJ and extract column names
	var cols = ''; // Store column names
	var params = ''; // Store Parameter references eg. $1, $2 etc
	var count = 1;
	for(var p in obj) {
		cols += p + ",";
		params += "$" + count + ",";
		count++;
	};
	var strSQL = "INSERT INTO " + table + " (";
	strSQL += cols.substr(0, cols.length - 1);
	strSQL += ') VALUES (';
	strSQL += params.substr(0, params.length - 1)
	strSQL += ') returning ' + returnid;
	//console.log(strSQL);
	return strSQL;
}

// Insert a table field
router.post('/insert_db_field', function (req, res, next) {
	// save the data to an object
	var formobj = req.body;
	//console.log(formobj)
	// Assign the table name to a variable for future use
	var table = formobj.dbtable;
	//Get the returnid value from the object
	var returnid = formobj.returnid;
	
	// Remove the table key, returnid and app-page from the object as it will interfere with the data to send to pg
	delete formobj.dbtable;
	delete formobj.returnid;
	delete formobj.apppage;
	
	// Build the SQL String with function
	var SQL = create_insert_SQL(formobj, table, returnid);		
	
	// Convert object to array to pass values to our query
	arrobj = [];
	for( var i in formobj ) {
    		arrobj.push(formobj[i])
	}	
	
	db.query(SQL, arrobj, function (err, result) {
		if (err) {
    			res.send(err)
    		} else {
			res.send("OK")
    		}
	})
})

// - /api/db/searchterm/table/<table in db>/term/<string to search>/fields/<field1>,<field2>/
// - Search box route, will create a query string and send back result based on serach parameters
// - will then render the calling page again with filtered results
router.get('/searchterm/table/:table/term/:term/fields/:fields/render/:render/arrayname/:arrayname', function (req, res, next) {
	// Split the fields and create the where clause
	var fields = req.params.fields.split(",");
	var strfields = '';
	for(var f = 0; f < fields.length; f++) {
		strfields += '(' + fields[f] + ' ilike \'%' + req.params.term + '%\') or ';
	}
	
	var pagetorender = req.params.render;
	var arrayname = req.params.arrayname;
	var term = req.params.term;
	
	// Clean up the where clause from the last or
	strfields = strfields.substr(0, strfields.length - 4);
	db.query('select * from ' + req.params.table + ' where ' + strfields, function (err, result) {
		if (err) {
    			res.send(err)
    		} else {
    			res.render(pagetorender, { [arrayname]: result.rows, term: term })	
    		}	
	})
})

module.exports = router;