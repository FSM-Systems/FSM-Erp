// - Update the DB value using the /api/update_db_value route
// - the column name is stored in the <col> attributes of the input field
// - The column id eg. lid in login table is stored in <colid> attribute
// - The column id value eg. 1 2 3 (lid) in login table is stored in <colidval> attribute 
// - The name of the table to update is taken from <input type=hjidden id=dbtable value={table name in database}> 
// - The value is taken from the input itself -> if its a checkbox it will be converted to boolean
// - This will update the tables in the Postgres Database
$(document).ready(function () {
	$(document).on("focus", ".update", function () {
		// Remove any error class when we focus on the input
		$(".update").removeClass("customerror")
		$(this).attr("oldvalue", $(this).val())
	})
	$(document).on("change", ".update", function () {
		var dbcolval;
		var input = $(this);
		if ($(this).is(":checkbox")) {
			if ($(this).is(":checked")) {
				dbcolval = true;	
			} else {
				dbcolval = false;
			}
		} else {
			dbcolval = $(this).val();
		}
		$.ajax({
			type: 'POST',
			url: '/api/db/update_db_field',
			data: {
				table: $("#dbtable").val(),
				dbcol: $(this).attr("col"),
				dbcolid: $(this).attr("colid"),
				dbcolval: dbcolval,
				dbcolidval: $(this).attr("colidval")
			},
			success: function (data) {
				if (data == "OK") {
					$("#succesfull_db").slideDown().delay(600).slideUp();
				} else {
					input.addClass("customerror");
					input.val(input.attr("oldvalue")) // - Revert to old value if error
					alert(JSON.stringify(data)) 
				}
			}, 
			error: function () {
				$("#error_db").slideDown().delay(1000).slideUp();
			}					
		})				
	})
})