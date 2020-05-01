// helper function to create element and add class, returns the element
function elementWithClass(elementStr, classStr) {
	const elem = document.createElement(elementStr);
	elem.classList.add(classStr);
	return elem;
}

// get current date string in mm/dd/yyyy
function getFormattedDate(date) {
	// todo padd with 0 if single digit
	const m = date.getMonth() + 1;
	const d = date.getDate();
	const y = date.getFullYear();
	return `${m}/${d}/${y}`;
}

// return date differences and the largest appropriate unit string
function dateDifference(dt1, dt2) {
	let ms = dt1 - dt2; // in milliseconds
	let min = ms / 1000 / 60;
	if (min < 60) return [Math.floor(min), "min"];
	let h = min / 60;
	if (h < 24) return [Math.floor(h), "hour"];
	let d = h / 24;
	if (d < 30) return [Math.floor(d), "day"];
	let month = d / 30;
	if (month < 12) return [Math.floor(month), "month"];
	let y = month / 12;
	return [Math.floor(y), "year"];
}
