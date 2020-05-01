// helper function to create element and add class, returns the element
function elementWithClass(elementStr, classStr) {
	const elem = document.createElement(elementStr);
	elem.classList.add(classStr);
	return elem;
}

function padZero(val) {
	if (val < 10) {
		return "0" + val;
	}
	return val;
}

// get current date string in mm/dd/yyyy
function getFormattedDate(date) {
	// todo padd with 0 if single digit
	const m = padZero(date.getMonth() + 1);
	const d = padZero(date.getDate());
	const y = padZero(date.getFullYear());
	return `${m}/${d}/${y}`;
}

// return date differences and the largest appropriate unit string
function dateDifference(dt1, dt2) {
	const ms = dt1 - dt2; // in milliseconds
	const min = ms / 1000 / 60;
	if (min < 60) return [Math.floor(min), "min"];
	const h = min / 60;
	if (h < 24) return [Math.floor(h), "hour"];
	const d = h / 24;
	if (d < 30) return [Math.floor(d), "day"];
	const month = d / 30;
	if (month < 12) return [Math.floor(month), "month"];
	const y = month / 12;
	return [Math.floor(y), "year"];
}
