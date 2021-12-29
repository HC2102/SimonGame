var buttonColor = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 1;
var started = false;


  $(".btn").click(function(e){
    var userChosenColor = e.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(e.target);
    checkAnswer(userClickedPattern.length-1);
  });
  //whenever player press key, game will start and the nextSequence will be called
    $(document).keypress(function(){
      if(!started)
      {
      nextSequence();
      started = true;
    }
  });


function nextSequence()
{
    var ranNum = Math.round(Math.random()*3);
    var ranChosenColor = buttonColor[ranNum];
    gamePattern.push(ranChosenColor);
    $("#"+ranChosenColor).fadeTo(200,0.5).fadeTo(200,1);
    playSound(ranChosenColor);
    $("h1").text("level "+level);
    level++;
}

function playSound(name)
{
  var audio = new Audio("sounds"+"/"+ name +".mp3");
  audio.play();
}

function animatePress(currentColor)
{
  $(currentColor).addClass("pressed");
  setTimeout(function(){ //stackOverFlowSolution.
$(currentColor).removeClass("pressed");}, 100);
}

function checkAnswer(currentLevel)
{
  if( userClickedPattern[currentLevel] == gamePattern[currentLevel])
  {
    if(userClickedPattern.length == gamePattern.length)
    {
      console.log( "true");
      userClickedPattern = [];
      setTimeout(function(){
        nextSequence()
      },1000);
    }
  }
  else{
    console.log( "false");
    gameOver();
  }
}
function gameOver()
{
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  }, 200);
  $("h1").text("Game Over, Press Any Key to Restart");
  playSound("wrong")
  gamePattern = [];
  userClickedPattern = [];
  level = 1;
  started = false;
}
