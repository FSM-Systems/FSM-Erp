// - Insert into the DB value using the /api/insert_db_value route
// - The function serializes the form which contains all the info such as table and fields to update
// - The page has to be created with 2 hidden fields whcih are dbtable and returnid which are used in the insert query
// - In order to reload the page after a sucessfull insert the hidden input app-page has to be set to the page we want to reload in workspace
// After done clear all form Items

$(document).ready(function () {
	$(document).on("click", "#btninsert", function (event) {
		$("#frmnewitem").validate({
			errorClass: 'customerror',
			errorPlacement: function(error,element) {
				return true; // No labels for the error fields. Just highlight with error class! Looks better and more fluid
			}		
		});
		if($("#frmnewitem").valid() == true) {
			$.ajax({
				type: 'POST',
				url: '/api/db/insert_db_field',
				data: $("#frmnewitem").serializeArray(),
				success: function (data) {
					if (data == "OK") {
						$("#succesfull_db").slideDown().delay(600).slideUp();
						$("#workspace").load($("#apppage").val())
						$("#frmnewitem").find("input[type=text], input[type=email], textarea").val("");
						$("#frmnewitem").find("*").filter(":input:first").focus();
					} else {
						// Add the error message from backend to the alertbox
						//$("#error_db").html($("#error_db").html() + JSON.stringify(data))
						//$("#error_db").slideDown();
						alert(JSON.stringify(data))
					}
				}, 
				error: function () {
					$("#error_db").slideDown().delay(1000).slideUp();
				}			
			})
		} else {
			$("#error_validate").slideDown().delay(600).slideUp();
		}
	})
})