const proxy = "https://cors-anywhere.herokuapp.com";
const URL = "https://project-1-api.herokuapp.com";
const API_KEY = "4b308f9e-10f3-48c5-86e2-2eefbd6938f3";

// takes a path string, a dom list to clear, a callback fn to render elements on screen, and an optional sort fn
// gets data from api call, clear appropriate dom list and populates on screen using callback fn
function populateData(path, listToClear, display, sort) {
	axios
		.get(`${URL}/${path}?api_key=${API_KEY}`) // get promise from api
		.then((res) => {
			listToClear.innerHTML = ""; // clear list on screen
			let arr = [];
			res.data.forEach((datum) => {
				arr.push(datum);
			});
			if (typeof sort === "function") arr = sort(arr); // if a sort function is passed, sort arr before render
			render(arr, display);
		})
		.catch((err) => {
			console.log(err);
		});
}

// posts a new comment to api, then repopulates comments list
function postComment(event, newComment) {
	event.target.reset(); // clear input fields
	axios({
		method: "post",
		url: `${proxy}/${URL}/comments?api_key=${API_KEY}`,
		data: newComment,
		headers: {
			"Content-Type": "application/json; charset=UTF-8",
		},
	})
		.then(() => {
			populateData(
				"comments",
				commentsListElem,
				displayComment,
				dateSortComments
			);
		})
		.catch((err) => {
			console.log(err);
		});
}

// delete comment from api and repopulate comments list
function deleteComment(comment) {
	axios
		.delete(`${URL}/comments/${comment.id}?api_key=${API_KEY}`)
		.then(() => {
			populateData(
				"comments",
				commentsListElem,
				displayComment,
				dateSortComments
			);
		})
		.catch((err) => {
			console.log(err);
		});
}
