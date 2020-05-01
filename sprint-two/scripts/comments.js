/*
	TAKES COMMENTS, BUILDS HTML ELEMENTS AND RENDERS ON SCREEN
*/
// DOM elements
const commentsList = document.querySelector(".comments__list");
const newCommentForm = document.querySelector(".new-comment__form");

// event listeners
newCommentForm.addEventListener("submit", formHandler);

// handlers
function formHandler(e) {
	// prevent page refresh
	e.preventDefault();
	// construct a new comment and push to comments array
	const name = e.target.name.value;
	const content = e.target.content.value;
	if (name !== "" && content !== "") {
		comments.push({
			userName: name,
			datePosted: new Date(),
			content: content,
		});
		commentsList.innerHTML = ""; // clear all comments on screen
		render(comments); // render comments
		e.target.reset(); // clear input fields
	} else {
		alert("Please add name and/or comment");
	}
}

// returns a handler that toggles comments date format
const toggleDate = (comment) => {
	let counter = 0;
	return () => {
		const displays = document.querySelectorAll(".comment__date");
		displays.forEach((display) => {
			if (counter % 2 === 0) {
				// if clicked odd number of times, display posted date
				display.textContent = getFormattedDate(comment.datePosted);
			} else {
				// even, display time since posted date
				[diff, unit] = dateDifference(new Date(), comment.datePosted);
				display.textContent = `${diff} ${unit} ago`;
			}
		});
		counter++;
	};
};

/* 
COMMENT CONSTRUCTOR FUNCTIONS 
*/
// constructs text wrapper for comments and returns it
function textWrapper(comment) {
	const nameElem = elementWithClass("span", "comment__name");
	nameElem.textContent = comment.userName;

	const dateElem = elementWithClass("span", "comment__date");

	// if date elem clicked, toggle time display for all comments
	const toggleHandler = toggleDate(comment);
	dateElem.addEventListener("click", toggleHandler);

	// display time passed since posted date
	[diff, unit] = dateDifference(new Date(), comment.datePosted);
	dateElem.textContent = `${diff} ${unit} ago`;

	const commentElem = elementWithClass("p", "comment__content");
	commentElem.textContent = comment.content;

	const textWrapper = elementWithClass("div", "comment__text-wrapper");
	textWrapper.append(nameElem, dateElem, commentElem);

	return textWrapper;
}

// contructs comment elem and comment divider and returns them
function displayComment(comment) {
	const userIcon = elementWithClass("div", "comment__user-icon");

	const commentElem = elementWithClass("article", "comment");
	commentElem.append(userIcon, textWrapper(comment));

	const dividerElem = elementWithClass("hr", "comments__divider");
	return [commentElem, dividerElem];
}

// renders comments to screen in reverse chrono order
function render(comments) {
	// TODO: once comments are sorted, use foreach
	for (let i = comments.length - 1; i >= 0; i--) {
		const [comment, divider] = displayComment(comments[i]);
		commentsList.append(comment, divider);
	}
}

// render comments on load
// IIFE
(function init() {
	render(comments);
})();
