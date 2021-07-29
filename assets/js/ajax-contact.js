$(function() {

	// Get the form.
	var form = $('#contact-form');

	// Get the messages div.
	var formMessages = $('.form-message');

	// Set up an event listener for the contact form.
	$(form).submit(function(e) {
		// Stop the browser from submitting the form.
		e.preventDefault();

		// Serialize the form data.
		var formData = $(form).serialize();

		// Submit the form using AJAX.
		$.ajax({
			type: 'POST',
			url: $(form).attr('action'),
			data: formData
		})
		.done(function(response) {
			// Make sure that the formMessages div has the 'success' class.
			console.log("response",response);
			$(formMessages).removeClass('error');
			$(formMessages).addClass('success');

			// Set the message text.
			$(formMessages).text(response);

			// Clear the form.
			$('#contact-form input,#contact-form textarea').val('');
		})
		.fail(function(data) {
			// Make sure that the formMessages div has the 'error' class.
			console.log("data",data);
			// Set the message text.
			if (data.status == 400) {
				$(formMessages).addClass('error');
				$(formMessages).removeClass('success');
				$(formMessages).text('Please fill in the form before send.');
			} else if (data.responseText !== '') {
				$(formMessages).text(data.responseText);
			} else {
				$(formMessages).removeClass('error');
				$(formMessages).addClass('success');
				$(formMessages).text('The Message is sent. Thank you for getting in touch!');
			}
		});
	});

});
