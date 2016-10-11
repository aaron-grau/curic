/* global $ */

// dropdown function that toggles 'hidden' class to the gear-dropdown ul
const toggleDropdown = (e) => {
	e.preventDefault();
	$(e.currentTarget.children).toggleClass('hidden');
};

// Add click listener to gear icon which invokes toggle function
$(() => $('#gear-dropdown').on('click', toggleDropdown));

