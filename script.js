import { questions } from "./dataQuestions.js";
import { dataThemesImages } from "./dataImg.js";
import { funNinjaImages } from "./dataImg.js";
// l'utilisateur choisit un thème en cliquant sur le pictogramme

function themeSelection() {
	const themesList = document.querySelectorAll(".themesChoices ul li img");
	let selectedTheme = ""; //laisser en dehors ou mettre ds fction ?
	let filteredQuestions=[];
	for (let i = 0; i < themesList.length; i++) {
		themesList[i].addEventListener("click", () => {
			selectedTheme = themesList[i].dataset.key;
			if (selectedTheme === "allThemes"){
				filteredQuestions = questions;
			} else {
				filteredQuestions = questions.filter((question) =>
				question.theme.includes(selectedTheme),
			)};
			themeQuestionDisplay(selectedTheme);
			questionsDisplay(filteredQuestions);
		});
	}
}
themeSelection();

// Le thème choisi et son pictogramme s'affichent dans la div .thème
function themeQuestionDisplay(selectedTheme) {
	const themeTitle = document.querySelector(".theme h3");
	if (selectedTheme === "allThemes" ){
		themeTitle.innerText = "Tous les thèmes";}
		else{
	themeTitle.innerText = `Thème ${selectedTheme}`};
	const themeImg = document.querySelector(".theme img");
	const themeDisplay = dataThemesImages.find((display) =>
		display.theme.includes(selectedTheme),
	);
	themeImg.src = themeDisplay.imgSrc;
}
// la première question du thème s'affiche (dans un ordre aléatoire - à faire plus tard),
//  avec ses propositions de réponse.
let index = 0;
const goodAnswer = "good";
const badAnswer = "bad";
function questionsDisplay(filteredQuestions) {
	//AJOUTER UNE FONCTIONNALITE : SI ON CHANGE DE THEME TOUS LES COMPTEURS DONT L'INDEX SE REMETTENT A ZERO
	const checker = document.getElementById("checker");
	const questionToDisplay = document.querySelector(".card h3");
	const answersToDisplay = document.querySelector(".card ul");
	const ninjaDisplay = document.querySelector(".ninja");

	questionToDisplay.innerText = "";
	//afficher la question :
	questionToDisplay.innerText = filteredQuestions[index].question;
	answersToDisplay.innerHTML = "";
	ninjaDisplay.src = funNinjaImages[funNinjaRandom()];

	for (const choice of filteredQuestions[index].choices) {
		const answerButton = document.createElement("button");
		answerButton.textContent = choice;
		answersToDisplay.appendChild(answerButton);
		//si une réponse est cliquée (ou si le temps est écoulé - A FAIRE PLUS TARD), on affiche la question suivante
		answerButton.addEventListener("click", () => {
			if (answerButton.textContent === filteredQuestions[index].answer) {
	
				answersChecker(checker, goodAnswer);

				// total.innerHTML = "";
				// score++;
			} else {
				answersChecker(checker, badAnswer);
				// total.innerHTML = "";
			}
			index++;

			console.log(`index ${index}`);
			if (index < filteredQuestions.length) {
				questionsDisplay(filteredQuestions);
			}
		});
	}
}

function answersChecker(checker, answer) {
	checker.innerText = "";
	const answerChecked = document.createElement("h3");
	if (answer === goodAnswer) {
		answerChecked.textContent = "Bonne réponse !";
	} else {
		answerChecked.textContent = "Mauvaise réponse !";
	}
	checker.appendChild(answerChecked);
}

//si la réponse cliquée est correcte, le score augmente de 1, sinon il ne change pas

//L'image d'un ninja rigolo s'affiche de façon aléatoire.
function funNinjaRandom() {
	return Math.floor(Math.random() * 5);
}
//Le timer se lance

//FIN DE JEU
// Lorsqu'il n'y a plus de questions, A FAIRE PLUS TARD
