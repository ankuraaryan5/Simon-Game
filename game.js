var BtnClr=["red", "blue", "green", "yellow"];
var gameptrn=[];
var userclick = [];
var started= false;
var level= 0;
$(document).keydown(function(){
    if(!started){
        $("#level-title").text("Level "+ level);
        nextSeq();
        started=true;
    }
})
function nextSeq(){
    level++;
    $("#level-title").text("Level "+ level);

    var RandNum = Math.floor(Math.random()*4);
    var randomChosenColour=BtnClr[RandNum];
    gameptrn.push(randomChosenColour);


    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

$(".btn").click(function(){
    var UserChosenColor = $(this).attr("id");
    userclick.push(UserChosenColor);
    // console.log(userclick);
    playSound(UserChosenColor);
    AnimatePress(UserChosenColor);

    CheckAns(userclick.length-1);
})

function playSound(name){

    var audio = new Audio("sounds/"+ name +".mp3");
    audio.play();
}

function AnimatePress(currentClr){
    $("#"+currentClr).addClass("pressed");

    setTimeout(function(){
        $("#"+currentClr).removeClass("pressed");
    }, 100)
}

function CheckAns(currentLvl){
    if(gameptrn[currentLvl]===userclick[currentLvl]){
    console.log("Success");

    if(userclick.length === gameptrn.length){
        setTimeout(function(){
            nextSeq();
        }, 1000);
    }

} 
else{
    console.log("Failed");

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);

    $("#level-title").text("Game-Over! Press any key to play again");
    reStart();
}
}

function reStart(){
    level=0;
    gameptrn=[];
    userclick=[];
    started=false;
}