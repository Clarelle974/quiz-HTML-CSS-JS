a faire : 
function nextQuestion(filteredQuestions) {
	index++;
	if (index < filteredQuestions.length) {
		questionsDisplay(filteredQuestions); // Afficher la question suivante
	} else {
		//ouverture d'une fenêtre avec la page résultats 
        affichage du score et de l'image adaptée en fonction du score
	}
}

Création d'un quizz en HTML, CSS et JS Vanilla 
Sixième semaine de formation 
Le site est articulé en 3 pages html : 
- une page accueil pour accéder au quiz 
- une page quiz
- une page résultats

Les éléments de CSS sont répartis dans 3 fichiers : 
- un fichier animations, qui centralise les keyframes 
- un fichier style, qui gère les éléments fixes des pages
- un fichier styleQuizDynamiques, qui met en forme les éléments modifiés par JS

Les éléments JS sont répartis dans 3 fichiers : 
- un fichier dataImg qui répertorie les adresses src des images générées par le script
- un fichier dataQuestions qui contient le tableau des questions-réponses 
- un fichier script avec les fonctions et sous-fonctions

Les éléments image n'ont pas été retraités mais la taille des image pourrait être compressée.
