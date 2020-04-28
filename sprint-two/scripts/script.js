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

function constructTextWrapperTop(comment) {
	const textWrapperTop = document.createElement("div");
	textWrapperTop.classList.add("text-wrapper--top");

	const nameElem = document.createElement("p");
	nameElem.classList.add("comment__name");
	nameElem.textContent = comment.userName;

	const dateElem = document.createElement("p");
	dateElem.classList.add("comment__date");
	dateElem.textContent = comment.datePosted;

	textWrapperTop.appendChild(nameElem);
	textWrapperTop.appendChild(dateElem);

	return textWrapperTop;
}

function constructTextWrapper(comment) {
	const textWrapper = document.createElement("div");
	textWrapper.classList.add("text-wrapper");

	textWrapper.appendChild(constructTextWrapperTop(comment));
	const commentElem = document.createElement("p");
	commentElem.classList.add("comment__content");
	commentElem.textContent = comment.content;
	textWrapper.appendChild(commentElem);

	return textWrapper;
}

function displayComment(comment) {
	const commentElem = document.createElement("article");
	commentElem.classList.add("comment");

	const userIcon = document.createElement("div");
	userIcon.classList.add("comment__user-icon");

	commentElem.appendChild(userIcon);
	commentElem.appendChild(constructTextWrapper(comment));

	return commentElem;
}

function constructDivider() {
	const dividerElem = document.createElement("hr");
	dividerElem.classList.add("divider");
	return dividerElem;
}

function render(comments) {
	for (comment of comments) {
		commentsList.appendChild(displayComment(comment));
		commentsList.appendChild(constructDivider());
	}
}

render(comments);
