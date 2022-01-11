// Global Variables

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

// Functions

  // This function creates a random number and associate it with a color
  // then passes the color to an array

function nextSequence(){

  userClickedPattern = [];

  level++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];


  gamePattern.push(randomChosenColour);

  // for (var i = 0; i <= gamePattern.length; i++){         //(This will animate the full sequence)
  //   eachColor(i);
  // }
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100); //(This will only animate the new color)
  playSound(randomChosenColour);
};

  // This function adds a delay to each iteration, so it will animate the full sequence

// function eachColor(i){
//   setTimeout(function(){
//     $("#" + gamePattern[i]).fadeOut(100).fadeIn(100);
//     playSound(gamePattern[i]);
//   }, 1000 * i);
// }

  // This function creates an object and then play the audio as per the color generated

function playSound(name){

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

};

  // This function adds/removes a created class to the color generated

function animatePress(currentColour){

  $("#" + currentColour).addClass("pressed");

  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed")
  }, 100);
};

  // This function checks that the selected answer was the correct or not
  // It verifies using an 'if' statement if you can continue playing or if the game is over

function checkAnswer(currentLevel){

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
      if (gamePattern.length === userClickedPattern.length){
        setTimeout(function(){
          nextSequence()}, 1000);
      }
    }
    else {

          var wrong = new Audio("sounds/wrong.mp3")
          wrong.play();

          $("body").addClass("game-over");

           setTimeout(function(){
             $("body").removeClass("game-over")
           }, 200);

           $("#level-title").text("Game Over. Press Any Key to Restart");

           startOver();
    }
};

  // This function restart the game whent the user lose

function startOver(){
  level = 0;
  gamePattern = [];
};

// Event Listeners

  // Event Listener that activates when the user clicks a button

$(".btn").click(function(){

  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(this.id);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);

});

  // Event Listener to know when to start the game

$(document).keydown(function(){
  if (gamePattern.length === 0){
      nextSequence();
  }
});
