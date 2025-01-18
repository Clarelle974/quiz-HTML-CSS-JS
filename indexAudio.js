document.querySelector(".start a").addEventListener("click", function (event) {
	event.preventDefault(); // Empêche la navigation immédiate

	const audio = document.getElementById("clic");
	audio.play().then(() => {
		// Ajouter un délai d'attente avant de rediriger sinon le son ne se joue pas
		setTimeout(() => {
			window.location.href = "quiz.html";
		}, 1000); // Délai de 1 seconde
	});
});

const audioPlayer = document.getElementById("audio-player");

// GitHub Pages : Arrêter le son à la fermeture de la page ou si elle est cachée
window.onbeforeunload = function () {
	audioPlayer.pause();
};

document.addEventListener("visibilitychange", function () {
	if (document.hidden) {
		audioPlayer.pause();
	}
});
