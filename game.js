var colorList=["green","red","yellow","blue"];
var adminList=[];
var playerList=[];
var started=false;
var level=1;

$(document).keydown(function (e) { 
    if (!started){
        $("body").removeClass("game-over");
        started=true;
        setTimeout(function(){
            nextColor();
        },100);
    }
});
$(document).click(function (e) { 
    if (!started){
        $("body").removeClass("game-over");
        started=true;
        setTimeout(function(){
            nextColor();
        },100);
    }
    
});

$(".btn").click(function () { 
    if (started){
        var playerColor=$(this).attr("id");
        playerList.push(playerColor);
        makeSound(playerColor);
        press(playerColor);
        checkAnswer()
    }
});

function nextColor(){
    $("#level-title").text("Level "+ level);
    playerList=[];
    var randomNum=Math.floor(Math.random()*4);
    adminList.push(colorList[randomNum]);
    makeSound(colorList[randomNum]);
    press(colorList[randomNum]);
}
function checkAnswer(){
    var pos=playerList.length-1;
    if (playerList[pos]===adminList[pos]){
        if (playerList.length===adminList.length){
            level++;
            setTimeout(function(){
                nextColor();
            },1000);
        }
    }
    else{
        makeSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Your answer is wrong, type any key to restart");
        setTimeout(function(){
            gameOver();
        },100);
    }
}
function gameOver(){
    adminList=[];
    playerList=[];
    level=1;
    started=false;
}
/////////////////////
function makeSound(key){
    var song=new Audio("sounds/"+key+".mp3");
    song.play();
}

function press(key){
    var obj=document.querySelector("#"+key);
    obj.classList.add("pressed");
    setTimeout(function(){
        obj.classList.remove("pressed")
    },100);
}
