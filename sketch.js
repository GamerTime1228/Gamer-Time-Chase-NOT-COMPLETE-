var START = 0;
var GAME = 1;
var END = 2;
var gameState = START;

var blueNinja;
var redNinja;
var invisibleGround;
var bg;
var obby;

var bgImg;
var groundImg;

var blueNinjaImg;

var GamerTimeImg
var startImg
var gameOverImg
var upArrowImg
var downArrowImg

var upArrow
var downArrow

var BNwalk1Img;
var BNwalk2Img;
var BNwalk3Img;

var BNslide1Img;
var BNslide2Img;

var redNinjaImg;

var RNwalk1Img;
var RNwalk2Img;
var RNwalk3Img;

var obby1Img;
var obby2Img;
var obby3Img;
var obby4Img;
var obby5Img;
var obby6Img;

var title;
var startButton;
var gameOverButton;

function preload() {
  GamerTimeImg = loadImage("./img1/GamerTime.png");

  bgImg = loadImage("./img1/bg.png");
  groundImg = loadImage("./img1/ground.png");

  startImg = loadImage("./img1/start.png");
  gameOverImg = loadImage("./img1/gameOver.png");

  upArrowImg = loadImage("./img1/UpArrow.png");
  downArrowImg = loadImage("./img1/DownArrow.png");
  
  blueNinjaImg = loadImage("./img1/blueNinja.png");
  
  BNanimation = loadAnimation("./img1/BNwalk1.png","./img1/BNwalk2.png", "./img1/BNwalk3.png");
  // BNwalk1Img = loadImage("./img1/BNwalk1.png");
  // BNwalk2Img = loadImage("./img1/BNwalk2.png");
  BNjumpImg = loadAnimation("./img1/BNwalk3.png");
  
  BNanimation2 = loadAnimation("./img1/BNslide2.png");
  // BNslide1Img = loadImage("./img1/BNslide1.png");
  // BNslide2Img = loadImage("./img1/BNslide2.png");
  
  redNinjaImg = loadImage("./img1/redNinja.png");

  RNwinImg = loadAnimation("./img1/RNwin.png");
  
  RNanimation = loadAnimation("./img1/RNwalk1.png", "./img1/RNwalk2.png", "./img1/RNwalk3.png");
  // RNwalk1Img = loadImage("./img1/RNwalk1.png");
  // RNwalk2Img = loadImage("./img1/RNwalk2.png");
  // RNwalk3Img = loadImage("./img1/RNwalk3.png");
  
  obby1Img = loadImage("./img1/obby1.png");
  obby2Img = loadImage("./img1/obby2.png");
  obby3Img = loadImage("./img1/obby3.png");
  obby4Img = loadImage("./img1/obby4.png");
  obby5Img = loadImage("./img1/obby5.png");
  obby6Img = loadImage("./img1/obby6.png");


}

function setup() {
  createCanvas(800,400);

  bg = createSprite(600,175,1600,200);
  bg.addImage(bgImg);
  bg.velocityX = -2;
  bg.x = bg.width / 2;
  bg.scale = 1.9;

  blueNinja = createSprite(300, 300, 50, 50);
  blueNinja.addAnimation("BNwalking", BNanimation);
  blueNinja.addAnimation("BNsliding", BNanimation2);
  blueNinja.addAnimation("BNjumping", BNjumpImg);
  blueNinja.scale = 1.25;
  blueNinja.setCollider("circle", 0, 10, 20);

  redNinja = createSprite(75, 200, 50, 400);
  redNinja.addAnimation("RNwalking", RNanimation);
  redNinja.addAnimation("RNwinning", RNwinImg);
  redNinja.scale = 4;

  obbyGroup = new Group();

  invisibleGround = createSprite(400, 380, 800, 20);
  invisibleGround.addImage(groundImg);
  invisibleGround.scale = 2;
  // invisibleGround.setCollider("rectangle", 0, 0, 0, 0);
  // invisibleGround.debug = true;
  // invisibleGround.visible = false;

  title = createSprite(400,150);
  title.addImage(GamerTimeImg);
  title.scale = 0.75;
  title.visible = false;

  startButton = createImg("./img1/start.png");
  startButton.position(355, 300);
  startButton.size(100, 50);
  startButton.mouseClicked(gamePlayOne);

  gameOverButton = createImg("./img1/gameOver.png");
  gameOverButton.position(600, 200);
  gameOverButton.size(100, 50);
  gameOverButton.mouseClicked(gamePlayTwo);

}

function draw() {
  background(0); 
  if(gameState === 0) {
    background("#004a8a"); 
    title.visible = true;
    startButton.position(355, 300);
    gameOverButton.position(-100, -100);
    bg.visible = false;
    blueNinja.visible = false;
    redNinja.visible = false;
    obbyGroup.visible = false;
    invisibleGround.visible = false;
  }
  if(gameState === 1) {
    title.visible = false;
    startButton.position(-100, -100);
    gameOverButton.position(-100, -100);
    bg.visible = true;
    blueNinja.visible = true;
    redNinja.visible = true;
    redNinja.changeAnimation("RNwalking", RNanimation);
    redNinja.x = 75;
    redNinja.y = 200;
    obbyGroup.visible = true;
    invisibleGround.visible = true;

    spawnObby();

    if(bg.x < 0) {
      bg.x = bg.width / 2;
    }

    if(obbyGroup.collide(blueNinja)) {
      redNinja.x = 85;
      blueNinja.velocityX = -2;
      obbyGroup.setVelocityXEach(-2);
    }

    else {


      blueNinja.velocityY += 0.8
  
      //if(keyDown(RIGHT_ARROW)) {
        //blueNinja.x = blueNinja.x + 25;
      //}
  
      //if(keyDown(LEFT_ARROW)) {
        //blueNinja.x = blueNinja.x - 25;
      //}
  
  
      if(obbyGroup.x < blueNinja.x){
        redNinja.x = 75;
      }
  
      if(blueNinja.y <= 300) {
        blueNinja.changeAnimation("BNwalking", BNanimation);
      }

      if(blueNinja.y <= 0) {
        blueNinja.y = 300;
        blueNinja.y += 10;
      }

      if(blueNinja.x <= 100) {
        gameState = 2;
      }
  
      obbyGroup.setVelocityXEach(-4);
      obbyGroup.setVelocityYEach(0);
      blueNinja.collide(invisibleGround);
      obbyGroup.collide(invisibleGround);
      blueNinja.bounceOff(obbyGroup);
    }
  
    if(keyDown("space")) {
      blueNinja.y -= 17;
      blueNinja.changeAnimation("BNjumping", BNjumpImg);
      blueNinja.velocityX = 0;
    }
  
    if(keyDown("DOWN_ARROW")) {
      blueNinja.y = 310;
      blueNinja.changeAnimation("BNsliding", BNanimation2);
      blueNinja.velocityX = 0;
    }
  }

  if(gameState === 2) {
    redNinja.changeAnimation("RNwinning", RNwinImg);
    redNinja.x = 400;
    redNinja.y = 230;
    redNinja.scale = 2;
    bg.velocityX = 0;
    bg.x = 500;
    blueNinja.remove();
    obbyGroup.destroyEach();
    gameOverButton.position(600, 200);
    startButton.mouseClicked(gamePlayOne);
  }
  // camera.position.x = blueNinja.x + 200;

  drawSprites();
}

function spawnObby() {
  if(frameCount % 100 === 0) {
    obby = createSprite(850, 300, 50, 75);
    obby.addImage(obby5Img);
    obby.scale = 1.25
    obby.velocityX = -4;
    obby.lifetime = 200;

    var ran = Math.round(random(1,6))

    switch(ran){
      case 1 : obby.addImage(obby1Img);
      break; 
      case 2 : obby.addImage(obby2Img); 
      break; 
      case 3 : obby.addImage(obby3Img);
      break; 
      case 4 : obby.addImage(obby4Img);
      break; 
      case 5 : obby.addImage(obby5Img); 
      break; 
      case 6 : obby.addImage(obby6Img);
      break; 
      default: break; 
    }

    obbyGroup.add(obby);
    
  }
}

function gamePlayOne() {
  gameState = 1;
}

function gamePlayTwo() {
  gameState = 0;
}