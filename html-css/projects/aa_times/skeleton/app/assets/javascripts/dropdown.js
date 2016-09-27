/* global $ */

const gearDropdown = (e) => {
	e.preventDefault();
	let $el = $(e.currentTarget.children);
	if ($el.attr('class') === 'gear-dropdown') {
		$el.addClass('hidden');
	} else {
		$el.removeClass('hidden');
	}
};

$(() => $('#gear-dropdown').on('click', gearDropdown));

