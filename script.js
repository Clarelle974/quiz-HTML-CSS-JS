import { questions } from "./dataQuestions.js";
import { dataThemesImages } from "./dataImg.js";
import { funNinjaImages } from "./dataImg.js";

// Sécurisation : Fonction pour échapper les caractères HTML
function escapeHTML(str) {
	return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// l'utilisateur choisit un thème en cliquant sur le pictogramme

// Déclaration des variables qui doivent être en dehors des fonctions
let filteredQuestions = [];
let selectedTheme = "";
let index = 0;
let score = 0;
let timerControl;
const goodAnswer = "good";
const badAnswer = "bad";
const goodSound = document.getElementById("good");
const badSound = document.getElementById("bad");

const quiz = document.querySelector(".quiz");

const allowedThemes = [
	"One Piece",
	"Naruto",
	"Hunter x Hunter",
	"Pokémon",
	"allThemes",
];
if (!allowedThemes.includes(selectedTheme)) {
	selectedTheme = "allThemes"; // Sécurisation : Vérifie que le thème est autorisé
}

// Choix du thème de questions
function themeSelection() {
	const themesList = document.querySelectorAll(".themesChoices ul li img");
	for (let i = 0; i < themesList.length; i++) {
		themesList[i].addEventListener("click", () => {
			selectedTheme = themesList[i].dataset.key;

			// Sécurisation : Vérification et nettoyage du thème sélectionné
			if (!allowedThemes.includes(selectedTheme)) {
				selectedTheme = "allThemes"; // Si le thème n'est pas dans la liste, choisir "allThemes"
			}

			// Filtrage des questions en fonction du thème sélectionné
			if (selectedTheme === "allThemes") {
				filteredQuestions = questions;
			} else {
				filteredQuestions = questions.filter((question) =>
					question.theme.includes(selectedTheme),
				);
			}

			index = 0;
			score = 0;
			clearInterval(timerControl);

			themeQuestionDisplay(selectedTheme);
			questionsDisplay(filteredQuestions);
			quiz.style.display = "flex";
		});
	}
}

// Appel de la fonction :
themeSelection();

// Le thème choisi et son pictogramme s'affichent dans la div .thème
function themeQuestionDisplay(selectedTheme) {
	quiz.style.display = "flex";
	const themeTitle = document.querySelector(".theme h3");

	// Sécurisation : Utilisation de escapeHTML pour éviter les failles XSS
	if (selectedTheme === "allThemes") {
		themeTitle.innerText = "Tous les thèmes";
	} else {
		themeTitle.innerText = `Thème ${escapeHTML(selectedTheme)}`; // Sécurisation
	}

	const themeImg = document.querySelector(".theme img");
	const themeDisplay = dataThemesImages.find((display) =>
		display.theme.includes(selectedTheme),
	);
	themeImg.src = themeDisplay.imgSrc;
}

// Affichage des questions et réponses, comptage des points
function questionsDisplay() {
	// Récupération du DOM
	const checker = document.getElementById("checker");
	const questionToDisplay = document.querySelector(".card h3");
	const answersToDisplay = document.querySelector(".card ul");
	const ninjaDisplay = document.querySelector(".ninja");
	const scoreDisplay = document.querySelector(".score");

	// Afficher le score
	scoreDisplay.innerText = `${score} / ${filteredQuestions.length}`;
	// Afficher la question :
	questionToDisplay.innerText = "";
	questionToDisplay.textContent = `n°${index + 1}/${filteredQuestions.length} : ${escapeHTML(filteredQuestions[index].question)}`; // Sécurisation

	answersToDisplay.innerText = "";
	// Appel de la fonction pour afficher un ninja rigolo random :
	ninjaDisplay.src = funNinjaImages[funNinjaRandom()];
	// Déclenchement du timer
	timer();

	// Création des boutons de réponse
	for (const choice of filteredQuestions[index].choices) {
		const answerButton = document.createElement("button");
		answerButton.textContent = escapeHTML(choice); // Sécurisation : Échapper les choix
		answersToDisplay.appendChild(answerButton);

		// Si une réponse est cliquée (ou si le temps est écoulé - A FAIRE PLUS TARD), on affiche la question suivante
		answerButton.addEventListener("click", () => {
			clearInterval(timerControl);
			if (answerButton.textContent === filteredQuestions[index].answer) {
				answersCheckerDisplay(checker, goodAnswer);

				score++;
			} else {
				answersCheckerDisplay(checker, badAnswer);
			}
			nextQuestion(filteredQuestions);
		});
	}
}

// Affichage d'un texte bonne ou mauvaise réponse, et son associé
function answersCheckerDisplay(checker, answer) {
	checker.innerText = "";
	const answerChecked = document.createElement("h3");
	if (answer === goodAnswer) {
		answerChecked.textContent = "Bonne réponse !";
		goodSound.play();
	} else {
		answerChecked.textContent = "Mauvaise réponse !";
		badSound.play();
	}
	checker.appendChild(answerChecked);
	checker.style.animation = "none"; // Réappliquer les effets d'animation car le DOM n'est pas rechargé
	requestAnimationFrame(() => {
		requestAnimationFrame(() => {
			checker.style.animation = "fadeOut 1s 1s forwards"; // Réapplique l'animation
		});
	});
}

// L'image d'un ninja rigolo s'affiche de façon aléatoire.
function funNinjaRandom() {
	return Math.floor(Math.random() * 5);
}

// Affichage de la question suivante (sera appelé en cas de réponse ou de temps écoulé)
function nextQuestion(filteredQuestions) {
	index++;
	if (index < filteredQuestions.length) {
		questionsDisplay(filteredQuestions); // Afficher la question suivante
	} else {
		const params = new URLSearchParams({
			score: score,
			totalLength: filteredQuestions.length,
			percentage: (score * 100) / filteredQuestions.length,
		});
		setTimeout(() => {
			window.location.href = `finDeJeu.html?${params.toString()}`;
		}, 2000);
	}
}

// Définition du timer
const timerDisplay = document.querySelector(".timer");
function timer() {
	// Pas besoin de mettre filteredQuestions en paramètre, il le trouve, sinon ça fait bugger nextQuestions
	let time = 10;
	timerDisplay.innerText = `${time}`;
	timerControl = setInterval(() => {
		time--;
		timerDisplay.innerText = `${time}`;

		if (time <= 0) {
			clearInterval(timerControl); // Arrête le timer à zéro
			nextQuestion(filteredQuestions);
		}
	}, 1000);
}
