// get current date string in mm/dd/yyyy
function getFormattedDate() {
	// todo padd with 0 if single digit
	const date = new Date();
	const m = date.getMonth() + 1;
	const d = date.getDate();
	const y = date.getFullYear();
	return `${m}/${d}/${y}`;
}
