// - Update the DB value using the /api/update_db_value route
// - the column name is stored in the attributes of the input field
// - The column id eg. lid in login table is stored in attribute colid of input field
// - The name of the table to update is taken from the actual HTML table on th page 
// - so we have to give it an attribute called dbtable eg. <table id="dbtable" dbtable="login">
// - The ID value is stores in the attribute colidval of the input
// - This will update the tables in the Postgres Database
$(document).ready(function () {
	$(document).on("change", ".update", function () {
		var dbcolval;
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
				table: $("#dbtable").attr("dbtable"),
				dbcol: $(this).attr("col"),
				dbcolid: $(this).attr("colid"),
				dbcolval: dbcolval,
				dbcolidval: $(this).attr("colidval")
			},
			success: function (data) {
				if (data == "OK") {
					$("#succesfull_db").slideDown().delay(600).slideUp();
				} else {
					alert(JSON.stringify(data))
					//$("#error_db").slideDown().delay(1000).slideUp();
				}
			}, 
			error: function () {
				$("#error_db").slideDown().delay(1000).slideUp();
			}					
		})				
	})
})