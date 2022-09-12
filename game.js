var butterColours = ["red","blue","green","yellow"];

var gamePattern = [];

var userClickPattern = [];

var started= false;

var level =0;


$(document).keypress(function(){
  if(!started){
    $("#level-title").text("level "+level);
    newSequence();
    started = true;
   }

});

$(".btn").click(function(){

   var userChosenColour = $(this).attr("id");
   userClickPattern.push(userChosenColour);

   animatePress(userChosenColour);
   playSound(userChosenColour);
   checkAnswer(userClickPattern.length-1);
});

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickPattern[currentLevel]){
    if(userClickPattern.length === gamePattern.length){
      setTimeout(function(){
        newSequence();
      },1000);
    }
  }

  else{
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    var wrong=new Audio("sounds/wrong.mp3");
    wrong.play();
    startOver();
  }

}

function startOver(){
  level = 0;
  gamePattern=[];
  started=false;
}

function newSequence(){
  userClickPattern=[];
  level++;
  $("#level-title").text("level "+level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = butterColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
};



function playSound(name){
  var audio= new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  var self=$("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    self.removeClass("pressed");
  },100);

};
