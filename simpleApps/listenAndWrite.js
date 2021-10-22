(function(){

	// listen and write game

	const correctMessages = ["Correct!", "Good job!", "Great!", "Yup!", "Yes dear!"];
	const incorrectMesssages = ["Wrong!", "Not correct", "Oh no!", "Nope!", "No dear!"];

	const myCarousel = document.querySelector('#carouselExampleSlidesOnly');
	const carousel = new bootstrap.Carousel(myCarousel);
	const gotItButton = document.querySelector("#got-it");
	const letsPlayButton = document.querySelector("#lets-play");
	const maxNumber = document.querySelector("#max-number");
	const minNumber = document.querySelector("#min-number");
	const answer = document.querySelector("#listen-and-write-answer");
	const correctAnswerPanel = document.querySelector("#listen-and-write-correct-answer"); 
	const scoreboard = document.querySelector("#listen-and-write-score");
	const listenButton = document.querySelector("#listen-and-write-listen");
	const listenAgainButton = document.querySelector("#listen-and-write-listen-again");
	const checkButton = document.querySelector("#listen-and-write-check");

	var randomNumber = 0;
	var randomNumberString = "";
	var totalQuestions = 0;
	var totalCorrectAnwers = 0;
	
	function getRandomInt(max) {
		return Math.floor(Math.random() * max);
	}

	function getRandomArbitrary(min, max) {
		return Math.floor(Math.random() * (max - min) + min);
	}

	function numberWithCommas(x) {
	    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	function sayTheText(text){
		var utterance = new SpeechSynthesisUtterance();
		utterance.text = text;
		window.speechSynthesis.speak(utterance);
	}

	function displayCorrectAnswer(){
		correctAnswerPanel.classList.remove("invisible");
		correctAnswerPanel.innerHTML = "Correct answer is: " + randomNumber + " ==> ( " + randomNumberString + " )";
	}

	function clearCorrectAnswer(){
		correctAnswerPanel.classList.add("invisible");
		correctAnswerPanel.innerHTML = "";
	}

	function updateScore(){
		scoreboard.innerHTML = totalCorrectAnwers + " / " + totalQuestions;
	}

	function getRandomElementFromArray(arr){
		return arr[Math.floor(Math.random()*arr.length)]
	}

	function sayCorrect(){		
		sayTheText(getRandomElementFromArray(correctMessages));
	}

	function sayNotCorrect(){
		sayTheText(getRandomElementFromArray(incorrectMesssages));
	}

	gotItButton.onclick = function(){
		carousel.to(1); // move to min-max screen
	}

	letsPlayButton.onclick = function(){
		carousel.to(2); // move to game screen
	}

	maxNumber.onchange = function(){
		totalQuestions = 0;
		totalCorrectAnwers = 0;
		clearCorrectAnswer("");
		updateScore();
	};

	minNumber.onchange = function(){
		totalQuestions = 0;
		totalCorrectAnwers = 0;
		clearCorrectAnswer("");
		updateScore();
	};

	listenButton.onclick = function(){
		// randomNumber = getRandomInt(maxNumber.value);
		randomNumber = getRandomArbitrary(minNumber.value, maxNumber.value)
		randomNumberString = numberWithCommas(randomNumber);
		sayTheText(randomNumberString);
		totalQuestions++;
		clearCorrectAnswer("");
		updateScore();
		answer.focus();
		listenButton.disabled = true;
		listenAgainButton.disabled = false;
		checkButton.disabled = false;
	};

	listenAgainButton.onclick = function(){
		sayTheText(randomNumberString);
		answer.focus();
	};

	checkButton.onclick = function(){
		if(randomNumber === parseInt(answer.value)){
			totalCorrectAnwers++;
			sayCorrect();
		} else {
			sayNotCorrect();
			displayCorrectAnswer();
		}
		answer.value = "";
		updateScore();
		listenButton.disabled = false;
		listenAgainButton.disabled = true;
		checkButton.disabled = true;
	};

	updateScore();

})();