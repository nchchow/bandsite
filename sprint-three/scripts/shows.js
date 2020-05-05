/**
 * TAKES SHOWS, BUILDS HTML COMPONENTS AND LISTS THEM ON THE SCREEN
 */
// DOM elements
const showsListElem = document.querySelector(".shows__list");

// construct a show element and divider and appends them to shows list elem
function displayShow(show) {
	const showElem = elementWithClass("article", "show");
	const dateElem = elementWithClass("span", "show__date");
	dateElem.textContent = show.date;
	const venueElem = elementWithClass("span", "show__venue");
	venueElem.textContent = show.place;
	const locationElem = elementWithClass("span", "show__location");
	locationElem.textContent = show.location;
	const buttonElem = elementWithClass("button", "show__buy-button");
	buttonElem.textContent = "BUY TICKETS";
	showElem.append(dateElem, venueElem, locationElem, buttonElem);
	const dividerElem = elementWithClass("hr", "shows__list__divider");
	showsListElem.append(showElem, dividerElem);
}

(function init() {
	populateData("showdates", displayShow);
})();
