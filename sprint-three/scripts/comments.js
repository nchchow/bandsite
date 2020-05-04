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
	const comment = e.target.content.value;
	if (name !== "" && comment !== "") {
		COMMENTS_DATA.push({
			name: name,
			timestamp: new Date().getTime(),
			comment: comment,
		});
		commentsList.innerHTML = ""; // clear all comments on screen
		render(dateSortComments(COMMENTS_DATA), displayComment); // render comments
		e.target.reset(); // clear input fields
	} else {
		alert("Please add name and/or comment");
	}
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

/* 
COMMENT CONSTRUCTOR FUNCTIONS 
*/
// constructs text wrapper for comments and returns it
function textWrapper(comment) {
	const nameElem = elementWithClass("span", "comment__name"); // creates element and add class
	nameElem.textContent = comment.name;

	const dateElem = elementWithClass("span", "comment__date");

	// if date elem clicked, toggle time display for the comment
	const toggleHandler = toggleDate(comment);
	dateElem.addEventListener("click", toggleHandler);

	// display time passed since posted date
	dateElem.textContent = dateDifference(
		new Date().getTime(),
		comment.timestamp
	);

	const commentElem = elementWithClass("p", "comment__content");
	commentElem.textContent = comment.comment;

	const textWrapper = elementWithClass("div", "comment__text-wrapper");
	textWrapper.append(nameElem, dateElem, commentElem);

	return textWrapper;
}

// contructs comment elem and comment divider and appends them to comments list
function displayComment(comment) {
	const userIcon = elementWithClass("div", "comment__user-icon");

	const commentElem = elementWithClass("article", "comment");
	commentElem.append(userIcon, textWrapper(comment));

	const dividerElem = elementWithClass("hr", "comments__divider");
	commentsList.append(commentElem, dividerElem);
}

// returns new array of comments sorted by date in reverse chrono order
function dateSortComments(comments) {
	return comments.slice().sort((a, b) => b.timestamp - a.timestamp);
}

// render comments on load
// IIFE
(function init() {
	populateData("comments", COMMENTS_DATA, displayComment);
})();
