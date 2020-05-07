// takes an array and a callback function that builds HTML elements on the screen
function render(arr, display) {
	arr.forEach((data) => display(data));
}

// helper function to create element and add class(es), returns the element
function elementWithClass(elementStr, ...classStrs) {
	const elem = document.createElement(elementStr);
	classStrs.forEach((classStr) => {
		elem.classList.add(classStr);
	});
	return elem;
}

/*
	DATE FUNCTIONS
*/
// pad 0 for single digits
function padZero(val) {
	return val < 9 ? "0" + val : val;
}

// takes a timeStamp and returns date string in mm/dd/yyyy
function getShortDate(timeStamp) {
	const date = new Date(timeStamp);
	const m = padZero(date.getMonth() + 1);
	const d = padZero(date.getDate());
	const y = date.getFullYear();
	return `${m}/${d}/${y}`;
}

// take date difference and unit, then format to string
function formatDateDiff(diff, unit) {
	if (diff !== 1) unit += "s"; // plural
	return `${diff} ${unit} ago`;
}

// return array containing a rough date difference and the largest appropriate unit as string
function dateDifference(dt1, dt2) {
	const ms = dt1 - dt2; // in milliseconds
	const min = ms / 1000 / 60;
	if (min < 60) return formatDateDiff(Math.floor(min), "min");

	const h = min / 60;
	if (h < 24) return formatDateDiff(Math.floor(h), "hour");

	const d = h / 24;
	if (d < 30) return formatDateDiff(Math.floor(d), "day");

	const month = d / 30;
	if (month < 12) return formatDateDiff(Math.floor(month), "month");

	const y = month / 12;
	return formatDateDiff(Math.floor(y), "year");
}

// returns a handler that toggles comment's date format
const toggleDate = (comment) => {
	let toggled = false; // private value
	return function () {
		if (toggled) {
			// display time passed since posted date
			this.textContent = dateDifference(
				new Date().getTime(),
				comment.timestamp
			);
		} else {
			// display posted date
			this.textContent = getShortDate(comment.timestamp);
		}
		toggled = !toggled;
	};
};
