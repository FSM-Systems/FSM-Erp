// - Insert into the DB value using the /api/insert_db_value route
// - The function serializes the form which contains all the info such as table and fields to update
// - The page has to be created with 2 hidden fields whcih are dbtable and returnid which are used in the insert query
// - In order to reload the page after a sucessfull insert the hidden input app-page has to be set to the page we want to reload in workspace
// - if we add a comma separated second value, the page will be reloaded in the frame specified in the value after the coma
// - Eg apppage="/menu/foo,pageframe" /menu/foo will be loaded in $("#pageframe") and not $("#workspace")
// - If the attribute is set to noreload then no refresh will happen
// - After done clear all form Items

// - When inserting we will exclude the inputs that that have a class nodb in them. This is usefull when getting input data from autocompletes
// - The autocompletes create a hidden field woith the id of the item and this is what we use to insert into the DB, not the label text

// - For the moment we need to have 2 functions for the insert, one is for the mai page and one is for the details
// - This because the apppage are all on the page and we cannot differentiate whcih one we are looking for
// - What happens is that the main page will be reloaded and not the details page

// - btninsert of for main button in main pages, whereas bintomsert-det ifsfor details

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
				data: $("#frmnewitem").find(":input").not(".nodb").serializeArray(), // Exclude class nodb as this is used in autocompletes. We want the id and not the text
				success: function (data) {
					if (data == "OK") {
						$("#succesfull_db").slideDown().delay(600).slideUp(); // Show success alert box
						if ($("#apppage").val() != "noreload") {
							$("#workspace").load($("#apppage").val()) // Reload page in div to refresh data
						}
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
	
	// - Function to handle inserts in details forms (example: goods issue noted details)
	$(document).on("click", "#btninsert-det", function (event) {
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
				data: $("#frmnewitem").find(":input").not(".nodb").serializeArray(), // Exclude class nodb as this is used in autocompletes. We want the id and not the text
				success: function (data) {
					if (data == "OK") {
						$("#succesfull_db").slideDown().delay(600).slideUp(); // Show success alert box
						if ($("#apppage-det").val() != "noreload") {
							$("#divnewitem").load($("#apppage-det").val()) // Reload page in div to refresh data
						}
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