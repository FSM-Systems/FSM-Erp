// - On change of menu item order, get all the order integers from the number we have inserted and increase them by 1 so we do not have duplicates
	// - EG if wetypes in 3, we would take 3,4 and 5 and make them 4,5 and 6 but exclude the current input bos as this is the one we are modifying
	$(".order").change(function () {
		$(".table tbody tr td.order input").each(function () {
			//$(this).val($(this).val() = 1);
			alert($(this).class())					
		})
	})
})