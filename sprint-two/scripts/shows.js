// DOM elements
const showsListElem = document.querySelector(".shows__list");

function render(showsData) {
	showsData.forEach((showData) => {
		const [show, divider] = displayShow(showData);
		showsListElem.append(show, divider);
	});
}

// construct each show element and divider and returns them
function displayShow(show) {
	const showElem = elementWithClass("article", "show");
	const dateElem = elementWithClass("span", "show__date");
	dateElem.textContent = show.date;
	const venueElem = elementWithClass("span", "show__venue");
	venueElem.textContent = show.venue;
	const locationElem = elementWithClass("span", "show__location");
	locationElem.textContent = show.location;
	const buttonElem = elementWithClass("button", "show__buy-button");
	buttonElem.textContent = "BUY TICKETS";
	showElem.append(dateElem, venueElem, locationElem, buttonElem);
	const dividerElem = elementWithClass("hr", "shows__list__divider");
	return [showElem, dividerElem];
}

(function init() {
	render(showsData);
})();
