// - Insert into the DB value using the /api/insert_db_value route
// - The function serializes the form which contains all the info such as table and fields to update
// - The page has to be created with 2 hidden fields whcih are dbtable and returnid which are used in the insert query
// - In order to reload the page after a sucessfull insert the hidden input app-page has to be set to the page we want to reload in workspace
// After done clear all form Items

// - Delete a row from DB table
// - The button handler is included. You have to add a button with class="btndelete"
// - In order to identify the line that has to be deleted we have to pass the id from the DB in the dbcolid attribute of the button
// - The id value to be deleted is passed as attribute to the button like dbcolidval=<id value from DB>


$(document).ready(function () {
	$(document).on("click", ".btn-delete", function () {
		var btn = $(this);
		if (confirm('ARE YOU SURE YOU WANT TO DELETE THIS ITEM?')) {
			$.ajax({
				type: 'POST',
				url: '/api/db/delete_db_field',
				data: {
					dbcolid: $(this).attr("dbcolid"),
					dbcolidval: $(this).attr("dbcolidval"),
					table: $("#dbtable").attr("dbtable")
				},
				success: function (data) {
					if (data == "OK") {
						$("#succesfull_db").slideDown().delay(1000).slideUp();
						// remove row from table after succesfull DB Action
						btn.closest("tr").remove();
					} else {
						$("#error_db").slideDown().delay(1000).slideUp();
					}
				}, 
				error: function () {
					$("#error_db").slideDown().delay(1000).slideUp();
				}			
			})	
		}
	})
})