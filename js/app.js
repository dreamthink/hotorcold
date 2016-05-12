
$(document).ready(function(){
	
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

	/*--- Start new game upon page load and reload ---*/
	var newGame = function() {
		var secretNumber = Math.floor(Math.random()*(100)+1);
		$("#feedback").text("Make your Guess!");
		$("#count").text("0");
	
	/*--- Declares variable based on value entered in user guess box. ---*/
	$("form").on("submit", function() {
		var userGuess = $("#userGuess").val();
		$("form")[0].reset();

	/*--- Restricts user guess to numbers from 1 to 100. ---*/
		if ((userGuess < 0) || (userGuess > 100)) {
			$("#feedback").text("Please enter an integer from 1 to 100.");
			return false;
		};

	/*--- Restricts user guess to integers. ---*/
		if (userGuess % 1 != 0) {
			$("#feedback").text("Please enter whole numbers only.");
			return false;
		};

	/*--- Returns error message if user guess consist of spaces only. ---*/
		if (($.trim(userGuess)).length === 0) {		
			$("#feedback").text("Blanks are not allowed. Please enter something.");
			return false;
		};

	/*--- Returns hot or cold feedback based on user guess ---*/
		if (userGuess === secretNumber) {
			$("#feedback").text("That's it! You guessed it!");
		} else if (Math.abs(userGuess - secretNumber < 10)) {
			$("#feedback").text("Very hot! Almost there.");
			return false;
		} else if (Math.abs(userGuess - secretNumber < 20)) {
			$("#feedback").text("Very warm!");
			return false;
		} else if (Math.abs(userGuess - secretNumber < 30)) {
			$("#feedback").text("Luke warm.");
			return false;
		} else if (Math.abs(userGuess - secretNumber < 40)) {
			$("#feedback").text("Just cool.");
			return false;
		} else {
			$("#feedback").text("Freezing cold.");
			return false;
		};

	});
};

	newGame();

	/*---- Start a new game upon clicking "NEW GAME" ---*/
	$(".new").on("click", function() {
		newGame();
	});


});


