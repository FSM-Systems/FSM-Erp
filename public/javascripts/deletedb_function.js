// - Delete a row from DB table
// - The button handler is included. You have to add a button with class="btndelete"
// - In order to identify the line that has to be deleted we have to pass the id from the DB in the dbcolid attribute of the button
// - The id value to be deleted is passed as attribute to the button like dbcolidval=<id value from DB>
// - The table from where to delete is passed as <input type=hidden id=dbatble value=<table name>>
// - When deleting from detail tables an extra attricbute "isdetail=true" has to be passwd in order to identifythat we are
// - updating a detail table and not a main table

$(document).ready(function () {
	$(document).on("click", ".btn-delete", function () {
		var btn = $(this);
		var table;
		if ($(this).attr("isdetail") == "true") {
			table = $("#dbtable-det").val()
		} else {
			table = $("#dbtable").val()	
		}
		if (confirm('ARE YOU SURE YOU WANT TO DELETE THIS ITEM?')) {
			$.ajax({
				type: 'POST',
				url: '/api/db/delete_db_field',
				data: {
					dbcolid: $(this).attr("dbcolid"),
					dbcolidval: $(this).attr("dbcolidval"),
					//table: btn.attr("dbtable")
					//table: $("#dbtable").val()
					table: table,
				},
				success: function (data) {
					if (data == "OK") {
						$("#succesfull_db").slideDown().delay(1000).slideUp();
						// remove row from table after succesfull DB Action
						btn.closest("tr").fadeOut();
					} else {
						alert(JSON.stringify(data))
					}
				}, 
				error: function () {
					$("#error_db").slideDown().delay(1000).slideUp();
				}			
			})	
		}
	})
})