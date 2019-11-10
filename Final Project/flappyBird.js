var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// load images



var bird = new Image();
var bg = new Image();
var fg = new Image();
var topRock = new Image();
var bottomRock = new Image();
var highscore = localStorage.getItem("highscore");
document.getElementById("highscore").innerHTML = highscore;

bird.src = "images/ezgif.com-resize.gif";

bg.src = "images/lowpolyback.jpg";
topRock.src = "images/Webp.net-resizeimage.png";
bottomRock.src = "images/Webp.net-resizeimage.png";



// some variables

var gap = 140;
var constant;

var bX = 40;
var bY = 150;

var gravity = 2.25;

var score = 0;


// audio files

var fly = new Audio();
var scor = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";

// on key down

document.addEventListener("keydown",moveUp);

function moveUp(){
    bY -= 35;
    fly.play();
}

// rock coordinates

var rock = [];

rock[0] = {
    x : cvs.width,
    y : 0
};

// draw images

function draw(){

    ctx.drawImage(bg,0,0);

    // allowing for the rocks to move forward (redraws per pixel)
    for(var i = 0; i < rock.length; i++){

        constant = topRock.height+gap;
        ctx.drawImage(topRock,rock[i].x,rock[i].y);
        ctx.drawImage(bottomRock,rock[i].x,rock[i].y+constant);

        rock[i].x --;
        rock[i].x --;
        //for some reason rock[i].x = rock[i].x - 2 doesn't work?

        if( rock[i].x == 300 ){
            rock.push({
                x : cvs.width,
                y : Math.floor(Math.random()*(-topRock.height/(4/3)))
            });
        }

        // detect collision

        if( bX + bird.width >= rock[i].x && bX <= rock[i].x + topRock.width && (bY <= rock[i].y + topRock.height || bY+bird.height >= rock[i].y+constant) || bY + bird.height >=  cvs.height ){

            if (highscore != null) {
              if (score > highscore) {
                localStorage.setItem("highscore", score);
              }
            }
            else {
              localStorage.setItem("highscore", score);
            }
            window.location.href = "gameover.html"; // reload the page
        }

        if(rock[i].x == 10){
            score++;
            scor.play();
            document.getElementById("score").innerHTML = score;
            if (score > highscore) {
              document.getElementById("highscore").innerHTML = score;

            }
        }


    }



    ctx.drawImage(bird,bX,bY);

    bY += gravity;




    requestAnimationFrame(draw);

}

draw();
