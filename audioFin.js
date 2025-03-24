document.querySelector(".fin a").addEventListener("click", (event) => {
	event.preventDefault();
	const audio = document.getElementById("clic");

	audio.play().then(() => {
		setTimeout(() => {
			window.location.href = "quiz.html";
		}, 500);
	});
});
