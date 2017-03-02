// - On change of menu item order, get all the order integers from the number we have inserted and increase them by 1 so we do not have duplicates
// - EG if wetypes in 3, we would take 3,4 and 5 and make them 4,5 and 6 but exclude the current input bos as this is the one we are modifying
$(document).ready(function () {
	// Save the old value to we can use it in calculations
	var oldval;
	$(".order").on('focusin', function () {
		oldval = $(this).val();	
	})

	$(".order").change(function () {
		// New value inputted
		var currval = parseInt($(this).val());
		// Calulate the difference bewteen new and old values and add it to the other inputs only if they are higher that the new value inserted
		var diff = currval - oldval;
		// Select all the inputs excluding the current one being modified and check. 
		$("#dbtable tbody tr td").find("input.order").not($(this)).each(function () {
			if (parseInt($(this).val()) >= currval) {
				// update the value
				$(this).val(parseInt($(this).val()) + diff);
				// Force Save to db by triggering the change event on this item
				$(this).trigger("change");
			}
		})
	})
})