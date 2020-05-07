/*
	TAKES COMMENTS, BUILDS HTML ELEMENTS AND RENDERS ON SCREEN
*/
// DOM elements
const commentsListElem = document.querySelector(".comments__list");
const newCommentFormElem = document.querySelector(".new-comment__form");

// event listeners
newCommentFormElem.addEventListener("submit", formHandler);

/*
	HANDLERS
*/
// handles form submission
function formHandler(event) {
	// prevent page refresh
	event.preventDefault();
	// construct a new comment and POST to backend
	const name = event.target.name.value;
	const content = event.target.content.value;
	if (name !== "" && content !== "") {
		postComment(event, {
			name: name,
			comment: content,
		});
	} else {
		alert("Please add name and/or comment");
	}
}

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
	updateTime(dateElem, comment);

	const commentElem = elementWithClass("p", "comment__content");
	commentElem.textContent = comment.comment;

	const textWrapper = elementWithClass("div", "comment__text-wrapper");
	textWrapper.append(nameElem, dateElem, commentElem);

	return textWrapper;
}

// contructs comment elem and comment divider and appends them to comments list
function displayComment(comment) {
	const userIcon = elementWithClass("div", "comment__user-icon");

	const deleteButton = elementWithClass("button", "comment__delete-button");
	deleteButton.textContent = "x";
	deleteButton.addEventListener("click", () => {
		deleteComment(comment);
	});

	const shiftWrapper = elementWithClass("div", "comment__shift-wrapper");
	shiftWrapper.append(userIcon, textWrapper(comment));

	const commentElem = elementWithClass("article", "comment");
	commentElem.append(shiftWrapper, deleteButton);

	const dividerElem = elementWithClass("hr", "comments__divider");
	commentsListElem.append(commentElem, dividerElem);
}

// returns new array of comments sorted by date in reverse chrono order
function dateSortComments(comments) {
	return comments.slice().sort((a, b) => b.timestamp - a.timestamp);
}

// render comments on load
// IIFE
(function init() {
	populateData("comments", commentsListElem, displayComment, dateSortComments);
})();
