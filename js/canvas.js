var width = document.getElementById("Home").clientWidth;
var height = document.getElementById("Home").clientHeight;
var canvas = document.getElementById("Home");
//ctx allows for the drawing of 2d elements on the canvas
var ctx = canvas.getContext("2d");

canvas.width = width;
canvas.height = height;

//variables for game pieces
var character;

function startGame() {
//text of my name
    ctx.font = "50px Song Myung";
    ctx.textAlign = "center";
    ctx.fillStyle = "#E85A4F";
    ctx.fillText("Matthew Leong", width / 2, height / 2 - 150);

//first platform around my name
    ctx.beginPath();
    ctx.strokeStyle = "dotted";
    ctx.rect(width / 2 - 175, height / 2 - 190, 350, 50);
    ctx.stroke();

//text of desc 1
    ctx.font = "25px Lato";
    ctx.fillStyle = "black";
    ctx.fillText("a programmer from Brooklyn, New York, on a consistent grind.", width / 2 - 200, height / 2);

//second platform around the desc 1
    ctx.beginPath();
    ctx.strokeStyle = "dotted";
    ctx.rect(width / 2 - 545, height / 2 - 25, 690, 30);
    ctx.stroke();

//text of desc 2
    ctx.font = "25px Lato";
    ctx.fillStyle = "black";
    ctx.fillText("a learner constantly curious about how and why things work.", width / 2 + 200, height / 2 + 150);

//third platform around the desc 2
    ctx.beginPath();
    ctx.strokeStyle = "dotted";
    ctx.rect(width / 2 - 135, height / 2 + 125, 670, 30);
    ctx.stroke();

//initialize the sprite starting postition
    character = new sprite(10, height - 60, 50, 50, "character");
    character.update();
}

function sprite(xCor, yCor, w, h, type){
    this.xCor = xCor;
    this.yCor = yCor;
    this.w = w;
    this.h = h;
    this.gravity = 0;
    this.type = type;

    this.newPos = function(){

    }
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
    if(e.keyCode == 39){
        character.xCor += 5;
        character.update();
    }

}