/*
	TAKES COMMENTS, BUILDS HTML ELEMENTS AND RENDERS ON SCREEN
*/
// DOM elements
const commentsList = document.querySelector(".comments__list");
const newCommentForm = document.querySelector(".new-comment__form");

// event listeners
newCommentForm.addEventListener("submit", formHandler);

function formHandler(e) {
	// prevent page refresh
	e.preventDefault();
	// construct a new comment and push to comments array
	const name = e.target.name.value;
	const content = e.target.content.value;
	if (name !== "" && content !== "") {
		comments.push({
			userName: name,
			datePosted: getFormattedDate(),
			content: content,
		});
		clearComments(); // clear all comments on screen
		render(comments); // render comments
		e.target.reset(); // clear input fields
	} else {
		alert("Please add name and/or comment");
	}
}

// renders comments to screen in reverse chrono order
function render(comments) {
	// TODO: once comments are sorted, use foreach
	for (let i = comments.length - 1; i >= 0; i--) {
		const [comment, divider] = displayComment(comments[i]);
		commentsList.append(comment, divider);
	}
}

/* 
COMMENT CONSTRUCTOR FUNCTIONS 
*/
// contructs comment elem and comment divider and returns them
function displayComment(comment) {
	const userIcon = elementWithClass("div", "comment__user-icon");

	const commentElem = elementWithClass("article", "comment");
	commentElem.append(userIcon, textWrapper(comment));

	const dividerElem = elementWithClass("hr", "comments__divider");
	return [commentElem, dividerElem];
}

// constructs text wrapper for comments and returns it
function textWrapper(comment) {
	const nameElem = elementWithClass("span", "comment__name");
	nameElem.textContent = comment.userName;

	const dateElem = elementWithClass("span", "comment__date");
	dateElem.textContent = comment.datePosted;

	const commentElem = elementWithClass("p", "comment__content");
	commentElem.textContent = comment.content;

	const textWrapper = elementWithClass("div", "comment__text-wrapper");
	textWrapper.append(nameElem, dateElem, commentElem);

	return textWrapper;
}

// removes all comments and dividers on page
function clearComments() {
	while (commentsList.lastChild) {
		commentsList.removeChild(commentsList.lastChild);
	}

	// let elems = commentsList.children;
	// console.log(elems);
	// for (e of elems) {
	// 	console.log(e);
	// 	commentsList.removeChild(e);
	// }

	// const commentElems = document.querySelectorAll(".comment");
	// const dividers = document.querySelectorAll(".divider");
	// commentElems.forEach((comment) => {
	// 	commentsList.removeChild(comment);
	// });
	// // remove all except first divider
	// for (let i = 1; i < dividers.length; i++) {
	// 	commentsList.removeChild(dividers[i]);
	// }
}

// render comments on load
(function init() {
	render(comments);
})();
