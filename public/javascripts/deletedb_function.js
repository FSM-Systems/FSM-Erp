// - Delete a row from DB table
// - The button handler is included. You have to add a button with class="btndelete"
// - In order to identify the line that has to be deleted we have to pass the id from the DB in the dbcolid attribute of the button
// - The id value to be deleted is passed as attribute to the button like dbcolidval=<id value from DB>
// - The table from where to delete is passed as value of <input type=hidden id=dbtable>


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
					//table: btn.attr("dbtable")
					table: $("#dbtable").val()
				},
				success: function (data) {
					if (data == "OK") {
						$("#succesfull_db").slideDown().delay(1000).slideUp();
						// remove row from table after succesfull DB Action
						btn.closest("tr").remove();
					} else {
						//$("#error_db").slideDown().delay(1000).slideUp();
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