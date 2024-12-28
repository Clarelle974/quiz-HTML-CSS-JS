import { questions } from "./dataQuestions.js";
import { dataThemesImages } from "./dataImg.js";
import { funNinjaImages } from "./dataImg.js";
// l'utilisateur choisit un thème en cliquant sur le pictogramme

//déclaration des variables qui doivent être en dehors des fonctions
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

//choix du thème de questions
function themeSelection() {
	const themesList = document.querySelectorAll(".themesChoices ul li img");
	for (let i = 0; i < themesList.length; i++) {
		themesList[i].addEventListener("click", () => {
			selectedTheme = themesList[i].dataset.key;
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

//appel de la fonction :
themeSelection();

// Le thème choisi et son pictogramme s'affichent dans la div .thème
function themeQuestionDisplay(selectedTheme) {
	quiz.style.display = "flex";
	const themeTitle = document.querySelector(".theme h3");
	if (selectedTheme === "allThemes") {
		themeTitle.innerText = "Tous les thèmes";
	} else {
		themeTitle.innerText = `Thème ${selectedTheme}`;
	}
	const themeImg = document.querySelector(".theme img");
	const themeDisplay = dataThemesImages.find((display) =>
		display.theme.includes(selectedTheme),
	);
	themeImg.src = themeDisplay.imgSrc;
}

//affichage des questions et réponses, comptage des points
function questionsDisplay() {
	//récupération du DOM
	const checker = document.getElementById("checker");
	const questionToDisplay = document.querySelector(".card h3");
	const answersToDisplay = document.querySelector(".card ul");
	const ninjaDisplay = document.querySelector(".ninja");
	const scoreDisplay = document.querySelector(".score");

	//afficher le score
	scoreDisplay.innerText = `${score} / ${filteredQuestions.length}`;
	//afficher la question :
	questionToDisplay.innerText = "";
	questionToDisplay.innerHTML = `n°${index+1}/${filteredQuestions.length} : <br>${filteredQuestions[index].question}`;
	answersToDisplay.innerHTML = "";
	//appel de la fct pour afficher un ninja rigolo random :
	ninjaDisplay.src = funNinjaImages[funNinjaRandom()];
	//déclenchement du timer
	timer();

	//création des boutons de réponse
	for (const choice of filteredQuestions[index].choices) {
		const answerButton = document.createElement("button");
		answerButton.textContent = choice;
		answersToDisplay.appendChild(answerButton);

		//si une réponse est cliquée (ou si le temps est écoulé - A FAIRE PLUS TARD), on affiche la question suivante
		answerButton.addEventListener("click", () => {
			clearInterval(timerControl);
			if (answerButton.textContent === filteredQuestions[index].answer) {
				answersCheckerDisplay(checker, goodAnswer);
				// total.innerHTML = "";
				score++;
			} else {
				answersCheckerDisplay(checker, badAnswer);
				// total.innerHTML = "";
			}
			nextQuestion(filteredQuestions);
		});
	}
}


//affichage d'un texte bonne ou mauvaise réponse
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
	checker.style.animation = "none"; // Réaplliquer les effets d'animation car le DOM n'est pas rechargé
	requestAnimationFrame(() => {
		requestAnimationFrame(() => {
			checker.style.animation = "fadeOut 1s 1s forwards"; // Réapplique l'animation
		});
	});
}

//L'image d'un ninja rigolo s'affiche de façon aléatoire.
function funNinjaRandom() {
	return Math.floor(Math.random() * 5);
}

// affichage de la question suivante (sera appelé en cas de réponse ou de temps écoulé)
function nextQuestion(filteredQuestions) {
	index++;
	if (index < filteredQuestions.length) {
		questionsDisplay(filteredQuestions); // Afficher la question suivante
	} else {
		const params = new URLSearchParams({
            score: score,
            totalLength: filteredQuestions.length,
			percentage : score*100/filteredQuestions.length
        });
		// window.location.href = `finDeJeu.html?${params.toString()}`;
		setTimeout(() => {
            window.location.href = `finDeJeu.html?${params.toString()}`;
        }, 2000); 
}}


//définition du timer
const timerDisplay = document.querySelector(".timer");
function timer() {
	//pas besoin de mettre filteredQuestions en paramètre, il le trouve, sinon ça fait bugger nextQuestions
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
