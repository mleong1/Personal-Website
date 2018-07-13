var width = document.getElementById("Home").clientWidth;
var height = document.getElementById("Home").clientHeight;
var canvas = document.getElementById("Home");
//ctx allows for the drawing of 2d elements on the canvas
var ctx = canvas.getContext("2d");

var doAnim = true;

//sprite of pixel me
//todo new bug the pixel me doesn't fall on left side after plat1
var idleImg = new Image();
idleImg.src = 'images/pixelMert.png';

var moveImg1 = new Image();
moveImg1.src = 'images/pixelMeFolder/pixelMe1.png';

var moveImg2 = new Image();
moveImg2.src = 'images/pixelMeFolder/pixelMe2.png';

var moveImg3 = new Image();
moveImg3.src = 'images/pixelMeFolder/pixelMe3.png';

var moveImg4 = new Image();
moveImg4.src = 'images/pixelMeFolder/pixelMe4.png';

var moveImg5 = new Image();
moveImg5.src = 'images/pixelMeFolder/pixelMe5.png';

var moveImg6 = new Image();
moveImg6.src = 'images/pixelMeFolder/pixelMe6.png';

var moveImg7 = new Image();
moveImg7.src = 'images/pixelMeFolder/pixelMe7.png';

var jumpImg = new Image();
jumpImg.src = 'images/pixelMeFolder/pixelMeJump.png';

var picArray = [idleImg, moveImg1, moveImg2, moveImg3, moveImg4, moveImg5, moveImg6, moveImg7];

//loading the goal sprites
var goalSpr1 = new Image();
goalSpr1.src = 'images/goalSprites/goalsprite1.png';

var goalSpr2 = new Image();
goalSpr2.src = 'images/goalSprites/goalsprite2.png';

var goalSpr3 = new Image();
goalSpr3.src = 'images/goalSprites/goalsprite3.png';

var goalSpr4 = new Image();
goalSpr4.src = 'images/goalSprites/goalsprite4.png';

var goalSpr5 = new Image();
goalSpr5.src = 'images/goalSprites/goalsprite5.png';

var goalArray = [goalSpr1, goalSpr2, goalSpr3, goalSpr4, goalSpr5];


canvas.width = width;
canvas.height = height;


//variables for game pieces
var character = new sprite(10, height - 60, 115, 115);
//goalToken is a platform but not really. Should get its own class for when it animates
var goalToken = new goal(width/2 - 20, 30, 50, 50);

//first platform around my name width/2 -175, height/2-190, 350, 50
platform1 = new platform(width/2 - 175, height/2 - 190, 350, 50, "plat1");
//second platform around the desc 1 width/2 - 545, height/2 - 25, 690, 30
platform2 = new platform(width/2 - 545, height/2 - 25, 690, 30, "plat2");
//third platform around the desc 2 width/2 - 135, height/2 + 125, 670, 30
platform3 = new platform(width/2 - 135, height/2 + 125, 670, 30, "plat3");


//ground array for platform heights
//-5 is a buffer so the character isn't standing directly on top of the words
var ground = [height - character.h, platform3.yCor - character.h,
    platform2.yCor - character.h, platform1.yCor - character.h];
var gCounter = 0;

function startGame() {

//todo do we need startgame?
//todo clean up code here
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

    //need to set these so the character can tell when it's not moving
    if(character.xVel > 0 && character.xVel < 1){
        character.xVel = 0;
    }
    if(character.xVel < 0 && character.xVel > -1){
        character.xVel = 0;
    }

    //this is why we need to two previous if statements. When xvel and yvel are 0 character isn't moving and
    //therefore will display it's standing still picture
    if(character.xVel == 0 && character.yVel == 0){
        character.moving = false;
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
    //messy check but necessary to make sure ground is decremented when you're jumping to plat2 from plat3 at the
    //edge
    //check doesn't guard against someone jumping right after the edge which will decrement gCounter and cause the
    //jump to plat 2 to miss
    if(!platform3.inRange(character) && gCounter == 1 && !character.jumping){
        gCounter--;
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
    this.moving = false;
    this.xVel = 0;
    this.yVel = 0;
    //collision point is the middle of the sprite combo of colX and colY
    //probably could make a point class to house these values
    this.collisionX = xCor + w/2;
    this.collisionY = yCor + h/2;
    this.imageCounter = 0;


    //update method draws the piece
    this.update = function(){
        if(!character.moving){
            this.imageCounter = 0;
        }
        //counter is double the amount of pictures because we divide the counter by 2 and floor that result
        //this causes the same animation picture to last for 2 animation frames in canvas
        if(this.imageCounter > 14){
            this.imageCounter = 0;
        }
        console.log("collision x value " + this.collisionX);
        console.log("collision y value " + this.collisionY);
        ctx.beginPath();
        if(this.yVel != 0){

            ctx.drawImage(jumpImg, this.xCor, this.yCor, this.w, this.h);
        } else {
            ctx.drawImage(picArray[Math.floor(this.imageCounter / 2)], this.xCor, this.yCor, this.w, this.h);
        }
        ctx.stroke();
        this.collisionX = this.xCor + this.w/2;
        this.collisionY = this.yCor + this.h/2;
        console.log("image counter " + this.imageCounter);
        this.imageCounter ++;

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
    this.imageCounter = 0;

    this.update = function(){
        /*this.lineEnd += 0.1;
        console.log("line end " + this.lineEnd);
        if(this.lineEnd > 50){
            this.lineEnd = 0;
        }*/

        //todo remove this cool code for a pixel art image

        if(this.imageCounter > 4){
            this.imageCounter = 0;
        }
        ctx.beginPath();
        /*ctx.fillStyle = "#F9CF00";
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
        ctx.stroke();*/
        ctx.drawImage(goalArray[this.imageCounter], this.xCor, this.yCor, this.w, this.h);
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.rect(this.collisionX - 1, this.collisionY - 1, 1, 1);
        ctx.stroke();

        this.imageCounter ++;
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
        character.moving = true;
        character.xVel += 2.0;
        if(character.xCor > width){
            character.xCor = -50;
        }
    //left direction
    } else if(e.keyCode == 37){
        character.moving = true;
        character.xVel -= 2.0;
        if(character.xCor < -50){
            character.xCor = width;
        }
    //ducking I suppose
    } else if(e.keyCode == 40){

    //jumping
    } else if(e.keyCode == 38){
        character.moving = true;
        if(!character.jumping){
            //controls jump height
            if(character.xCor > width){
                character.xCor = -50;
            } else if (character.xCor < -50){
                character.xCor = width;
            }
            character.yVel -= height/17;
            character.jumping = true;
        }
    }


}