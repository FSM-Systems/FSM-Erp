var express = require('express');
var router = express.Router();
var db = require('../db.js');

// Upload a file GENERIC
router.post('/file_upload/name/:ufilename/uploaddir/:uploaddir', function (req, res) {
	if (!req.files) 
		return res.status(400).send('No files were uploaded.');	
	
	let file = req.files.file
	
	// Move the file to uplods directory
	file.mv('/tmp/' + req.params.ufilename, function (err) {
		if (err)
      		return res.status(500).send(err);	
	})	
})

// Upload excel file for warehouse
router.post('/excel_upload/name/:ufilename/uploaddir/:uploaddir', function (req, res) {
	if (!req.files) 
		return res.status(400).send('No files were uploaded.');	
	
	let file = req.files.file

	var uploaddir = __dirname.replace("routes",req.params.uploaddir + "/").toString(); // Create upload path based on name and upload directory
	
	// Move the file to selected directory
	file.mv(uploaddir + req.params.ufilename, function (err) {
		if (err)
      		return res.status(500).send(err);	
	})	
	//console.log(req.files.file);
})

module.exports = router;