/* global $ */

const toggleModal = (e) => {
	// e.preventDefault();
	let $el = $("#search-modal");
	let $overlay = $("#overlay");
	if ($el.attr('class') === 'search-modal') {
		$el.addClass('expand');
		$overlay.removeClass('hidden');
	} else {
		$el.removeClass('expand');
		$overlay.addClass('hidden')
	}
};

// Add click listener to search icon which invokes sidebar function
$(() => $('#search-modal-btn').on('click', toggleModal));


// Add click listener to overlay
$(() => $('#overlay').on('click', toggleModal));

// Add click listener to close button
$(() => $('.close').on('click', toggleModal));


