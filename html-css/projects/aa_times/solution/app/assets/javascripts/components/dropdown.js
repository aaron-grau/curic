/* global $ */

// dropdown function that toggles 'hidden' class to the gear-dropdown ul
const toggleDropdown = (e) => {
	e.preventDefault();
	$('#gear-dropdown').toggleClass('hidden');
};

// Add click listener to gear icon which invokes toggle function
$(() => $('#gear-dropdown-btn').on('click', toggleDropdown));

