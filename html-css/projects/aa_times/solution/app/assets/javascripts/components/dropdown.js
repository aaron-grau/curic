/* global $ */

// dropdown function that applies or removes 'hidden' class to the gear-dropdown ul
const gearDropdown = (e) => {
	e.preventDefault();
	// instead of searching the DOM again for the dropdown
	// we can access it using the parent element found in the click event
	let $el = $(e.currentTarget.children);
	if ($el.attr('class') === 'gear-dropdown') {
		$el.addClass('hidden');
	} else {
		$el.removeClass('hidden');
	}
};

// Add click listener to gear icon which invokes dropdown function
$(() => $('#gear-dropdown').on('click', gearDropdown));

