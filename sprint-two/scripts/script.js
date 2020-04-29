const comments = [
	{
		userName: "Micheal Lyons",
		datePosted: "12/18/2018",
		content:
			"They BLEW the ROOF off at their last show, once everyone started figuring out they were going. This is still simply the greatest opening of a concert I have EVER witnessed.",
	},
	{
		userName: "Gary Wong",
		datePosted: "12/12/2018",
		content:
			"Every time I see him shred I feel so motivated to get off my couch and hop on my board. He’s so talented! I wish I can ride like him one day so I can really enjoy myself!",
	},
	{
		userName: "Theodore Duncan",
		datePosted: "11/15/2018",
		content:
			"How can someone be so good!!! You can tell he lives for this and loves to do it every day. Everytime I see him I feel instantly happy! He’s definitely my favorite ever!",
	},
];

const commentsList = document.querySelector(".comments__list");

// helper function to create element and add class, returns the element
function classElement(classStr, elementStr) {
	const elem = document.createElement(elementStr);
	elem.classList.add(classStr);
	return elem;
}

// constructs top text wrapper and returns it
function textWrapperTop(comment) {
	const nameElem = classElement("comment__name", "p");
	nameElem.textContent = comment.userName;

	const dateElem = classElement("comment__date", "p");
	dateElem.textContent = comment.datePosted;

	const textWrapperTop = classElement("text-wrapper--top", "div");
	textWrapperTop.append(nameElem, dateElem);
	// textWrapperTop.appendChild(dateElem);

	return textWrapperTop;
}

// constructs text wrapper for comments and returns it
function textWrapper(comment) {
	// comment content
	const commentElem = classElement("comment__content", "p");
	commentElem.textContent = comment.content;

	const textWrapper = classElement("text-wrapper", "div");
	textWrapper.append(textWrapperTop(comment), commentElem);

	return textWrapper;
}

// contructs comment and returns it
function displayComment(comment) {
	// user icon
	const userIcon = classElement("comment__user-icon", "div");

	const commentElem = classElement("comment", "article");
	commentElem.append(userIcon, textWrapper(comment));

	return commentElem;
}

// construct line divider between comments and returns it
function divider() {
	const dividerElem = classElement("divider", "hr");

	return dividerElem;
}

// renders comments to screen
function render(comments) {
	comments.forEach((comment) => {
		commentsList.append(displayComment(comment), divider());
	});
}

render(comments);
