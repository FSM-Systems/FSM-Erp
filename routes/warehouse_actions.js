var express = require('express');
var router = express.Router();
var db = require('../db.js');

// Confirm goods issued note and transfer from temp table to warehouse_stock table
// -1 multiplier as we are remving stuff from the stock
router.get('/goods_issue_note_confirm', function (req, res, next) {
	db.query('insert into warehouse_stock (wsitem,wsqty,wswarehouse,ws_user) \
		select ginditem,gindqty*-1,gindwid,$1 from goods_issue_notes_details where gind_ginid=$2', [req.session.user_id, req.query.gin], function (err, result) {
			if (err) {
				res.send(err);
			} else {
				res.send("OK");	
			}
	})
})

module.exports = router;