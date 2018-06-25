var width = document.getElementById("Home").clientWidth;
var height = document.getElementById("Home").clientHeight;
var canvas = document.getElementById("Home");
//ctx allows for the drawing of 2d elements on the canvas
var ctx = canvas.getContext("2d");

canvas.width = width;
canvas.height = height;


//variables for game pieces
var character = new sprite(10, height - 60, 50, 50);
//goalToken is a platform but not really. Should get its own class for when it animates
var goalToken = new platform(width/2 - 20, 30, 50, 50);
var platform1;
var platform2;
var platform3;

function startGame() {
//text of my name
    ctx.font = "50px Song Myung";
    ctx.textAlign = "center";
    ctx.fillStyle = "#E85A4F";
    ctx.fillText("Matthew Leong", width / 2, height / 2 - 150);

//first platform around my name width/2 -175, height/2-190, 350, 50
    platform1 = new platform(width/2 - 175, height/2 - 190, 350, 50);

//text of desc 1
    ctx.font = "25px Lato";
    ctx.fillStyle = "black";
    ctx.fillText("a programmer from Brooklyn, New York, on a consistent grind.", width / 2 - 200, height / 2);

//second platform around the desc 1 width/2 - 545, height/2 - 25, 690, 30
    platform2 = new platform(width/2 - 545, height/2 - 25, 690, 30);

//text of desc 2
    ctx.font = "25px Lato";
    ctx.fillStyle = "black";
    ctx.fillText("a learner constantly curious about how and why things work.", width / 2 + 200, height / 2 + 150);

//third platform around the desc 2 width/2 - 135, height/2 + 125, 670, 30
    platform3 = new platform(width/2 - 135, height/2 + 125, 670, 30);

//initialize the sprite starting postition 10, height - 60, 50, 50

    animate();
}

function animate(){
    requestAnimationFrame(animate);
    //clears everything previously in canvas to be redrawn because the character position changes
    ctx.clearRect(0, 0, width, height);

    character.xCor += character.xVel;
    character.xVel *= 0.9;
    //gravity
    character.yCor += character.yVel;
    character.yVel *= 0.9;
    if(character.yCor == height - 60){
        character.jumping = false;
        character.yCor == height - 60;
    } else {
        character.yCor += 1;
        character.yVel += 0.9;
    }

    character.update();
    goalToken.update();
    platform1.update();
    platform2.update();
    platform3.update();
}

function platform(xCor, yCor, w, h){
    this.xCor = xCor;
    this.yCor = yCor;
    this.w = w;
    this.h = h;

    this.update = function(){
        ctx.beginPath();
        ctx.strokeStyle = "dotted";
        ctx.rect(this.xCor, this.yCor, this.w, this.h);
        ctx.stroke();
    }



}

function sprite(xCor, yCor, w, h){
    this.xCor = xCor;
    this.yCor = yCor;
    this.w = w;
    this.h = h;
    this.jumping = true;
    this.xVel = 0;
    this.yVel = 0;

    //update method draws the piece
    this.update = function(){
        console.log(this.xCor);
        console.log(this.yCor);
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.rect(this.xCor, this.yCor, this.w, this.h);
        ctx.stroke();
    }

}

document.querySelector('body').onkeydown = function (e) {
    //right direction
    if(e.keyCode == 39){
        character.xVel += 1;
        if(character.xCor > width){
            character.xCor = -50;
        }
    //left direction
    } else if(e.keyCode == 37){
        character.xVel -= 1;
        if(character.xCor < -50){
            character.xCor = width;
        }
    //ducking I suppose
    } else if(e.keyCode == 40){

    //jumping
    } else if(e.keyCode == 38){
        if(!character.jumping){
            character.yVel -= 20;
            character.jumping = true;
        }
    }


}