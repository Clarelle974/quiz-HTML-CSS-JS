document.querySelector(".start a").addEventListener("click", (event) => {
	event.preventDefault();

	const audio = document.getElementById("clic");
	audio.play().then(() => {
		setTimeout(() => {
			window.location.href = "quiz.html";
		}, 500);
	});
});

const audioPlayer = document.getElementById("audio-player");
