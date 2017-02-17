// - Insert into the DB value using the /api/insert_db_value route
// - The function serializes the form which contains all the info such as table and fields to update
// - The page has to be created with 2 hidden fields whcih are dbtable and returnid which are used in the insert query
// - In order to reload the page after a sucessfull insert the hidden input app-page has to be set to the page we want to reload in workspace
// - After done clear all form Items

// - When inserting we will exclude the inputs that that have a class nodb in them. This is usefull when getting input data from autocompletes
// - The autocompletes create a hidden field woith the id of the item and this is what we use to insert into the DB, not the label text

$(document).ready(function () {
	$(document).on("click", "#btninsert", function (event) {
		$("#frmnewitem").validate({
			errorClass: 'customerror',
			errorPlacement: function(error,element) {
				return true; // No labels for the error fields. Just highlight with error class! Looks better and more fluid
			}		
		});
		if($("#frmnewitem").valid() == true) {
			console.log($("#frmnewitem").find(":input").not(".nodb").serializeArray())
			$.ajax({
				type: 'POST',
				url: '/api/db/insert_db_field',
				data: $("#frmnewitem").find(":input").not(".nodb").serializeArray(), // Exclude class nodb as this is used in autocompletes. We want the id and not the text
				success: function (data) {
					if (data == "OK") {
						$("#succesfull_db").slideDown().delay(600).slideUp(); // Show success alert box
						$("#workspace").load($("#apppage").val()) // Reload page in div to refresh data
						$("#frmnewitem").find("input[type=text], input[type=email], textarea").val(""); // Clear the form after insert has been done
						$("#frmnewitem").find("*").filter(":input:first").focus();
					} else {
						// - Display error in alert box
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