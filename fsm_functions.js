var Excel = require('exceljs');
var db = require('./db.js');
var fs = require('fs');

module.exports = {
	parse_excel: function (excel_file, user) { // Get file name and session user id
		var strSQL ="insert into warehouse_stock_import_temporary (sku,description,qty,cost,price,user_id) values ($1,$2,$3,$4,$5,$6)";
		var arrSQLParams = []; // Stores parameters for SQL insert per row
		var workbook = new Excel.Workbook();
		var ret = true;
		
		// Delete from temp table user stuff. We do not want to double things.
		db.query('delete from warehouse_stock_import_temporary where user_id=$1', [user], function (err, result) {
			if (err) {
    				console.log(err);
    				ret = false;
    			}
		})

		// Open the excel file 
		workbook.xlsx.readFile(excel_file).then(function () {
			// get the first worksheet			
			var worksheet = workbook.getWorksheet(1);
			// Loop through all rows
			worksheet.eachRow(function (row, rowNumber) {
				// Commit to DB only from line 2 and up. We want to exclude headers from excel file
				if (rowNumber > 1) {
					// Loop through all values and build array to pass to DB function
					row.eachCell(function (cell, colNumber) {
						arrSQLParams.push(cell.value)					
					})
					
					// Add the user id from session to the array
					arrSQLParams.push(user);
					
					// Insert into DB
					db.query(strSQL, arrSQLParams, function (err, result) {
						if (err) {
							console.log(err);
    							ret = false;
    						}
					})
					
					// Empty the array for new query
					arrSQLParams = [];
				}
			})			
		});
		// Delete the file from the upload directory and confirm success
		//fs.unlink(excel_file);
		// return success state
  		return ret;
	},
	// For every action we will update the _user_actions table with what has been done
	// This function is called for evey action: insert/update/delete
	/// req has to be supplie as it comes from the route. We use it to get the session user
	update_actions_table: function(action, table, column, data, req) {
		db.query('insert into _user_actions (uaaction,uatable,uauser,uacolumn, uadata) values ($1,$2,$3,$4, $5)', [ action, table, req.session.user_id, column, data ], function (err, result) {
			if (err) {
				console.log(err)
			}
		})
	}
}