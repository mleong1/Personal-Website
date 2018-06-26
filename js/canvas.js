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

//first platform around my name width/2 -175, height/2-190, 350, 50
platform1 = new platform(width/2 - 175, height/2 - 190, 350, 50, "plat1");
//second platform around the desc 1 width/2 - 545, height/2 - 25, 690, 30
platform2 = new platform(width/2 - 545, height/2 - 25, 690, 30, "plat2");
//third platform around the desc 2 width/2 - 135, height/2 + 125, 670, 30
platform3 = new platform(width/2 - 135, height/2 + 125, 670, 30, "plat3");


//ground array for platform heights
var ground = [height - 60, platform3.yCor - 50, platform2.yCor - 50, platform1.yCor - 50];
var gCounter = 0;

function startGame() {
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
    character.yVel += 1;
    character.yCor += character.yVel;
    character.yVel *= 0.9;


    //ground is height - 60, if character.yCor is greater than that it is going past the floor of height - 10
    if(character.yCor >= ground[gCounter]){
        character.jumping = false;
        character.yCor = ground[gCounter];
        character.yVel = 0;
    }

    console.log("platform3 xcor " + platform3.xCor);
    if(character.jumping && character.yCor < platform3.yCor && platform3.inRange(character)) {
        //Todo we need a smoother jump
        gCounter ++;
    }

    //this bit handles the character falling down from platforms
    if(!platform1.inRange(character) && gCounter == 3){
        gCounter --;
    }
    if(!platform2.inRange(character) && gCounter == 2){
        gCounter --;
    }
    if(!platform3.inRange(character) && gCounter == 1){
        gCounter --;
    }

    console.log("This is gcounter " + gCounter);

    if(gCounter > 3){
        gCounter = 0;
    }
    platform1.inRange(character);
    platform2.inRange(character);
    platform3.inRange(character);

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
        ctx.strokeStyle = "dotted";
        ctx.rect(this.xCor, this.yCor, this.w, this.h);
        ctx.stroke();
    }

    this.inRange = function(sprite){
        if(sprite.collisionPoint >= this.xCor && sprite.collisionPoint <= this.xCor + this.w){
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
    //collision point is the middle of the sprite
    this.collisionPoint = xCor + w/2;

    //update method draws the piece
    this.update = function(){
        console.log(this.xCor);
        console.log(this.yCor);
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.rect(this.xCor, this.yCor, this.w, this.h);
        ctx.stroke();
        this.collisionPoint = this.xCor + this.w/2;
    }

}

document.querySelector('body').onkeydown = function (e) {
    //Todo look into holding the key down and jump control
    //right direction
    if(e.keyCode == 39){
        character.xVel += 1.5;
        if(character.xCor > width){
            character.xCor = -50;
        }
    //left direction
    } else if(e.keyCode == 37){
        character.xVel -= 1.5;
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