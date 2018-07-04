var width = document.getElementById("Home").clientWidth;
var height = document.getElementById("Home").clientHeight;
var canvas = document.getElementById("Home");
//ctx allows for the drawing of 2d elements on the canvas
var ctx = canvas.getContext("2d");

var doAnim = true;



canvas.width = width;
canvas.height = height;


//variables for game pieces
var character = new sprite(10, height - 60, 50, 50);
//goalToken is a platform but not really. Should get its own class for when it animates
var goalToken = new goal(width/2 - 20, 30, 50, 50);

//first platform around my name width/2 -175, height/2-190, 350, 50
platform1 = new platform(width/2 - 175, height/2 - 190, 350, 50, "plat1");
//second platform around the desc 1 width/2 - 545, height/2 - 25, 690, 30
platform2 = new platform(width/2 - 545, height/2 - 25, 690, 30, "plat2");
//third platform around the desc 2 width/2 - 135, height/2 + 125, 670, 30
platform3 = new platform(width/2 - 135, height/2 + 125, 670, 30, "plat3");


//ground array for platform heights
var ground = [height - 65, platform3.yCor - 55, platform2.yCor - 55, platform1.yCor - 55];
var gCounter = 0;

function startGame() {

//todo do we need startgame?
//initialize the sprite starting postition 10, height - 60, 50, 50

    animate();
}

function animate() {
    if (doAnim) {
        requestAnimationFrame(animate);
    }
    if(goalToken.checkCol(character) < 20){
        var elem = document.getElementById("AboutMe");
        elem.scrollIntoView({
            behavior: "smooth"
        });
        console.log("should have crashed");
        doAnim = false;
    }
    //clears everything previously in canvas to be redrawn because the character position changes
    ctx.clearRect(0, 0, width, height);

    character.xCor += character.xVel;
    character.xVel *= 0.95;
    //gravity
    character.yVel += 1;
    character.yCor += character.yVel;
    character.yVel *= 0.9;


    //ground is height - 60, if character.yCor is greater than that it is going past the floor of height - 10
    if(character.yCor >= ground[gCounter]){
        character.jumping = false;
        character.yCor = ground[gCounter];
        character.yVel = 0;
    }

    /*These if statements change the ground level based on if the character is in the bounds of the platform
      and above it*/
    //+ character.h because we want the character to clear the entire platform and fall naturally on
    if(gCounter == 0 && character.yCor + character.h < platform3.yCor && platform3.inRange(character)) {
        gCounter ++;
        character.jumping = true;
    }

    if(gCounter == 1 && character.yCor + character.h < platform2.yCor && platform2.inRange(character)) {
        gCounter ++;
        character.jumping = true;
    }

    if(gCounter == 2 && character.yCor + character.h < platform1.yCor && platform1.inRange(character)) {
        gCounter ++;
        character.jumping = true;
    }


    /*This bit handles the character falling down from platforms. If out of range of the platform the character
      is on, the character the ground will change to a lower level.*/
    if(!platform1.inRange(character) && gCounter == 3){
        gCounter --;
    }
    if(!platform2.inRange(character) && gCounter == 2){
        gCounter --;
    }
    if(!platform3.inRange(character) && gCounter == 1){
        gCounter --;
    }

    //If the character tries to go higher than the number of levels, counter resets to level 3
    if(gCounter > 3){
        gCounter = 3;
    }

    platform1.inRange(character);
    platform2.inRange(character);
    platform3.inRange(character);

    //text of my name
    ctx.font = "50px Song Myung";
    ctx.textAlign = "center";
    ctx.fillStyle = "#E85A4F";
    ctx.fillText("Matthew Leong", width / 2, height / 2 - 150);

    //text of desc 1
    ctx.font = "25px Lato";
    ctx.fillStyle = "black";
    ctx.fillText("a programmer from Brooklyn, New York, on a consistent grind.", width / 2 - 200, height / 2);

    //text of desc 2
    ctx.font = "25px Lato";
    ctx.fillStyle = "black";
    ctx.fillText("a learner constantly curious about how and why things work.", width / 2 + 200, height / 2 + 150);


    character.update();
    goalToken.update();
    platform1.update();
    platform2.update();
    platform3.update();


}

function platform(xCor, yCor, w, h, name){
    this.xCor = xCor;
    this.yCor = yCor;
    this.w = w;
    this.h = h;
    this.name = name;

    this.update = function(){
        ctx.beginPath();
        ctx.rect(this.xCor, this.yCor, this.w, this.h);
        ctx.strokeStyle = "white";
        ctx.stroke();
    }

    this.inRange = function(sprite){
        if(sprite.collisionX >= this.xCor && sprite.collisionX <= this.xCor + this.w){
            return true;
        }
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
    //collision point is the middle of the sprite combo of colX and colY
    //probably could make a point class to house these values
    this.collisionX = xCor + w/2;
    this.collisionY = yCor + h/2;


    //update method draws the piece
    this.update = function(){
        console.log("collision x value " + this.collisionX);
        console.log("colluision y value " + this.collisionY);
        ctx.beginPath();
        ctx.rect(this.xCor, this.yCor, this.w, this.h);
        ctx.strokeStyle = "black";
        ctx.stroke();
        this.collisionX = this.xCor + this.w/2;
        this.collisionY = this.yCor + this.h/2;
    }

}

function goal(xCor, yCor, w, h){
    this.xCor = xCor;
    this.yCor = yCor;
    this.w = w;
    this.h = h;
    //var for the line to move mimicking 3d
    this.lineEnd = 0;
    //collision point for the goal sprite
    this.collisionX = xCor + w/2;
    this.collisionY = yCor + h/2;

    this.update = function(){
        this.lineEnd += 0.1;
        console.log("line end " + this.lineEnd);
        if(this.lineEnd > 50){
            this.lineEnd = 0;
        }

        ctx.beginPath();
        ctx.fillStyle = "#F9CF00";
        ctx.moveTo(this.xCor + this.w/2, this.yCor);
        ctx.lineTo(this.xCor, this.yCor + h);
        ctx.moveTo(this.xCor + this.w/2, this.yCor);
        ctx.lineTo(this.xCor + this.w, this.yCor + h);
        ctx.lineTo(this.xCor, this.yCor + h);
        ctx.moveTo(this.xCor + this.w/2, this.yCor);
        ctx.fill();
        ctx.lineTo(this.xCor + this.lineEnd, this.yCor + h);
        //now we run a line to the bottom left of the triangle and change the xvalue so it looks like 3d rotation

        ctx.strokeStyle = "#C0B283";
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.rect(this.collisionX - 1, this.collisionY - 1, 1, 1);
        ctx.stroke();

        //no need to update collision point since goal doesn't move
    }

    this.checkCol = function(sprite){
        var xDis = this.collisionX - sprite.collisionX;
        var yDis = this.collisionY - sprite.collisionY;

        //this number represents how close the goal is to the sprite
        return Math.sqrt(Math.pow(xDis, 2) +
                Math.pow(yDis, 2))
    }
}

document.querySelector('body').onkeydown = function (e) {
    //Todo look into holding the key down and jump control
    //right direction
    if(e.keyCode == 39){
        character.xVel += 2.0;
        if(character.xCor > width){
            character.xCor = -50;
        }
    //left direction
    } else if(e.keyCode == 37){
        character.xVel -= 2.0;
        if(character.xCor < -50){
            character.xCor = width;
        }
    //ducking I suppose
    } else if(e.keyCode == 40){

    //jumping
    } else if(e.keyCode == 38){
        if(!character.jumping){
            //controls jump height
            if(character.xCor > width){
                character.xCor = -50;
            } else if (character.xCor < -50){
                character.xCor = width;
            }
            character.yVel -= 35;
            character.jumping = true;
        }
    }


}