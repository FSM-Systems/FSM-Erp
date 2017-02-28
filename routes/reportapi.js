var express = require('express');
var router = express.Router();
var db = require('../db.js');
var config = require('../appconfig')

// Report routes

// Sample route
router.get('/template', function (req, res, next) {
	res.render('template', { report_name: 'Template Report'});
})

// Goods issued notes
/* router.get('/goods_issue_note/gin/:gin', function (req, res, next) {
	db.query('select * from vw_goods_issued_notes where ginid=$1', [req.params.gin], function (err, result) {
		db.query('select * from vw_goods_issued_notes_details where gind_ginid=$1', [req.params.gin], function (err, result2) {
			res.render('goods_issue_note', {
				head: result.rows,
				detail: result2.rows,	
				report_name: 'GOODS ISSUE NOTE',	
				serial: req.params.gin,
				refprefix: config.refprefix,
			})
		})
	})
})*/

// Goods issued notes
router.get('/print_report/rep_template/:rep_template/rep_name/:rep_name/view/:view/param_name/:param_name/param/:param', function (req, res, next) {
	db.query('select * from ' + req.params.view + ' where ' + req.params.param_name + '=$1', [req.params.param], function (err, result) {
		res.render(req.params.rep_template, {
			report_data: result.rows,	
			report_name:req.params.rep_name,	
			serial: req.params.param,
			refprefix: config.refprefix,
		})
	})
})


module.exports = router;