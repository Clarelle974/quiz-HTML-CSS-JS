import { endResultsImages } from "./dataImg.js";

const queryParams = new URLSearchParams(window.location.search);
        const score = queryParams.get('score');
        const totalLength = queryParams.get('totalLength');
        const percentage = queryParams.get('percentage');
		const results = document.querySelector(".endResults");
        

        if (score==="1"){
            results.innerText= `Tu as ${score} bonne réponse sur ${totalLength}, soit un score de ${percentage}%`;
        }
        else{
		results.innerText= `Tu as ${score} bonnes réponses sur ${totalLength}, soit un score de ${percentage}%`;
    };

    const endResultsImage = document.querySelector(".endImg");

    if (Number(percentage)<50){
        endResultsImage.src=endResultsImages[2];
    }
    else if (Number(percentage)<75){
        endResultsImage.src=endResultsImages[1];
    }
    else {
        endResultsImage.src=endResultsImages[0];
    }

	