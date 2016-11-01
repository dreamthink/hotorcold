"use strict";
var secretNumber,
userGuess,
feedback,
userFeedback,
gapNumber,
pastGuesses = [],
newButton,
input,
countElement,
count = 0,
guessList,
validatedGuess,
alreadyGuessed,
guessHtml,
max,
min,
form;

$(document).ready(pageLoad);

function pageLoad() {
	
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);
  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

  	feedback = $("#feedback");
  	form = $("form");
  	input = form.find("#userGuess");
  	newButton = $("a.new");
  	countElement = $("#count");
  	guessList = $("#guessList");
  	startNewGame();
}

	function startNewGame() {
		resetVariables();
		generateSecretNumber();
	}

	$(".new").on("click", function() {
		startNewGame();
	});
	
	function resetVariables() {
		secretNumber = "";
		userGuess = "";
		pastGuesses = [];
		count = 0;
		userFeedback = "Make Your Guess!";
		guessHtml = "";
		render();
	}

	function generateSecretNumber(min, max) {
		min = Math.ceil(1);
		max = Math.floor(100);
		secretNumber = Math.floor(Math.random() * (max - min + 1)) + min;
		console.log("Secret number is " + secretNumber);
	}

	/* Generate user guess after form is submitted */
 	$("form").submit(function(event) {	
 		event.preventDefault();
 		getUserGuess();
	});

 	function getUserGuess() {
		userGuess = input.val();
		input.val("");
		
		if (checkGuess()) {
			return ;
		}
	 	generateFeedback();
	 	trackGuess();
		guessCount();
		render();
	}

 	function checkGuess() {
 		userFeedback = "";
		if ((userGuess <= 0) || (userGuess > 100)) {
			alert("Please enter a number between 1 and 100.");
			return true;
	 	} else if (userGuess % 1 !== 0) {
 			alert("Please enter integers only.");
 			return true;
 		} else if (pastGuesses.indexOf(userGuess) !== -1) {
 			alert("You guessed this number already!");
 		} else {
 			validatedGuess = true;
 		}
 	}

		function generateFeedback() {
			userFeedback = "";
			gapNumber = Math.abs(secretNumber - userGuess);
			if (userGuess == secretNumber) {
				userFeedback = "You won! Play again?";
			} else if (gapNumber <= 10 && gapNumber >= 1) {
				userFeedback = "Very hot!";
			} else if (gapNumber <= 20 && gapNumber >= 11) {
				userFeedback = "Hot!";
			} else if (gapNumber <= 30 && gapNumber >= 21) {
				userFeedback = "Warm";
			} else if (gapNumber <= 49 && gapNumber >= 31) {
				userFeedback = "Cold";
			} else if (gapNumber >= 50) {
				userFeedback = "Ice cold";
			}
		}
	
	function render() {
		$("#guessList").html(guessHtml);
		$("#count").html(count);
		$("#feedback").html(userFeedback);	
	}

	function guessCount() {
	count = pastGuesses.length;
	}	

	function trackGuess() {
		if ((validatedGuess == true) && (pastGuesses.indexOf(userGuess) == -1)) {
			pastGuesses.push(userGuess);
		}

		guessHtml = "";
		if (pastGuesses[0].length) {
			$.each(pastGuesses, function(guess, value) {
				guessHtml += "<li>" + value + "</li>";
			});
		}

	}
