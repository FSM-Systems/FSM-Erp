var express = require('express');
var router = express.Router();
var db = require('../db.js');
var fsm = require('../fsm_functions.js')

// Upload a file GENERIC
router.post('/file_upload/uploaddir/:uploaddir', function (req, res) {
	if (!req.files) 
		return res.status(400).send('No files were uploaded.');	
	
	let file = req.files.file
	
	// Move the file to uplods directory
	file.mv(req.params.uploaddir + '/' + new Date().getTime() + '_' + file.name, function (err) {
		if (err)
      		return res.status(500).send(err);	
	})	
})

// Upload excel file for warehouse
router.post('/excel_upload/uploaddir/:uploaddir', function (req, res, next) {
	if (!req.files) 
		return res.status(400).send('No files were uploaded.');	
	
	let file = req.files.file

	var uploaddir = __dirname.replace("routes",req.params.uploaddir + "/").toString(); // Create upload path based on name and upload directory
	
	// Move the file to selected directory
	// Append timestamp so we do not overwrite any files
	var newfile = uploaddir + new Date().getTime() + '_' + file.name;
	file.mv(newfile, function (err) {
		if (err)
      		return res.status(500).send(err);
		// Parse excel file
		if (fsm.parse_excel(newfile, req.session.user_id) == true) {
			// redirecto to confirmation page
			res.send('OK');
		}
	})	
})

module.exports = router;