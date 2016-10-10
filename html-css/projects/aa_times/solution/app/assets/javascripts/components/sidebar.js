/* global $ */

// dropdown function that applies or removes 'expand' class to the sections-sidebar nav
const toggleSidebar = (e) => {
	// e.preventDefault();
	let $el = $("#sections-sidebar");
	if ($el.attr('class') === 'sections-sidebar') {
		$el.addClass('expand');
	} else {
		$el.removeClass('expand');
	}
};

const toggleSideBarIfExpanded = (e) => {
	e.preventDefault();
	if(e.currentTarget.className === 'sections-sidebar expand') {
		debugger;
		setTimeout(toggleSidebar, 1000);
	}
}

// Add click listener to hamburger icon which invokes sidebar function
$(() => $('#sections-sidebar-btn').on('click', toggleSidebar));


// Add click listener to gear icon which invokes dropdown function
$(() => $('#sections-sidebar').mouseleave(toggleSideBarIfExpanded));


