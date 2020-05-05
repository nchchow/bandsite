const proxy = "https://cors-anywhere.herokuapp.com";
const URL = "https://project-1-api.herokuapp.com";
const API_KEY = "NoorJim&Andrii4prez";

// takes a path string, a callback fn to render elements on screen, and an optional sort fn
// gets data from api call, pushes into array and populates on screen using callback fn
function populateData(path, render, sort) {
	const promise = axios.get(`${URL}/${path}?api_key=${API_KEY}`);
	promise
		.then((res) => {
			let arr = [];
			res.data.forEach((datum) => {
				arr.push(datum);
			});
			if (sort) arr = sort(arr);
			arr.forEach((datum) => {
				render(datum);
			});
		})
		.catch((err) => {
			console.log(err);
		});
}

// posts a new comment to api, then reloads comment section
function post(newComment) {
	axios({
		method: "post",
		url: `${proxy}/${URL}/comments?api_key=${API_KEY}`,
		data: newComment,
		headers: {
			"Content-Type": "application/json; charset=UTF-8",
		},
	})
		.then((res) => {
			commentsList.innerHTML = ""; // clear all comments on screen
			populateData(path, displayComment, dateSortComments);
			e.target.reset(); // clear input fields
		})
		.catch((err) => {
			console.log(err);
		});
}
