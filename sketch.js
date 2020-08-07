var trex,trex_running,groundImage,ground,falseGround,cloudMoving,cloudGroup;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6
var gameState,PLAY,END,obstacleGroup,score,trexCollided;
var gameOver,gameOverImg,restart,restartImg;
var die,jump,checkPoint;

function preload() {
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png")
  groundImage=loadImage("ground2.png")
  cloudMoving=loadImage("cloud.png")
  obstacle1=loadImage("obstacle1.png")
  obstacle2=loadImage("obstacle2.png")
  obstacle3=loadImage("obstacle3.png")
  obstacle4=loadImage("obstacle4.png")
  obstacle5=loadImage("obstacle5.png")
  obstacle6=loadImage("obstacle6.png")
  trexCollided=loadImage("trex_collided.png")
  gameOverImg=loadImage("gameOver.png")
  restartImg=loadImage("restart.png")
  die=loadSound("die.mp3")
  jump=loadSound("jump.mp3")
  checkPoint=loadSound("checkPoint.mp3")
  
}  

function setup() {
  createCanvas(700, 300);
  trex=createSprite(50,270,10,10)
  trex.addAnimation("running",trex_running)
  trex.addImage("trex_collided",trexCollided)
  trex.scale=0.4
  
  ground=createSprite(350,280,10,10)
  ground.addImage("ground",groundImage)
  
  falseGround=createSprite(350,282,700,10)
  falseGround.visible=false
  
  gameState=1
  PLAY=1
  END=0
  
  gameOver=createSprite(300,150,10,10)
  gameOver.addImage("end",gameOverImg)
  gameOver.visible=false
  
  restart=createSprite(300,180,10,10)
  restart.addImage("again",restartImg)
  restart.visible=false
  restart.scale=0.6

  
  obstacleGroup=new Group()
  cloudGroup=new Group()
  
  score=0
  
}

function draw() {
  background(255);
  
   trex.collide(falseGround)
  
  if(gameState===PLAY){
    ground.velocityX=-5
  if(ground.x<0){
    ground.x=ground.width/2
  }
  
 if(frameRate()>20){
       score=score+Math.round(frameRate()/35)
     }else if(frameRate()<20){
       score=score+Math.round(frameRate()/20)
     }
  
  if(keyDown("space")&&trex.y>250){
    trex.velocityY=-11
    jump.play()
  }
    
if(trex.isTouching(obstacleGroup)){
   gameState=END
  die.play()
   }
    
    if(score%100===0 && score>0){
      checkPoint.play()
    }

    
spawnObstacles()  
spawnClouds()

  
  trex.velocityY=trex.velocityY+0.8
     
}else if(gameState===END){
        trex.velocityY=0
       ground.velocityX=0
       cloudGroup.setVelocityXEach(0)
       obstacleGroup.setVelocityXEach(0)
       obstacleGroup.setLifetimeEach(-1);
       cloudGroup.setLifetimeEach(-1);
       trex.changeAnimation("trex_collided")
       gameOver.visible=true
       restart.visible=true;
      if(mousePressedOver(restart)){
        restartGame();
 }
}  
  
  drawSprites()
  textSize(20);
  textFont("times new roman");
  text(score,290,50);
  
}

function spawnClouds(){
  
  //spawn clouds after ever 80 frames
  if( frameCount%80===0){
    var cloud=createSprite(700,100,10,10);
    cloud.addImage("cloud",cloudMoving);
    cloud.velocityX=-6;
    cloud.lifetime=111;
   
    //spawn clouds at random heights   
    cloud.y= random(100,200);
    
    //to display clouds in the background
    cloud.depth=trex.depth;
    trex.depth=cloud.depth+1 ;
    cloudGroup.add(cloud);
 }
}

function spawnObstacles(){
  
  //generate obstacles                  
  if(frameCount%70===0){
    var obstacle= createSprite(700,260,10,10);
    var r=Math.round(random(1,6))
    if(r===1){
      obstacle.addImage("1",obstacle1)
    }else if(r===2){
      obstacle.addImage("1\2",obstacle2)
    }else
    if(r===3){
      obstacle.addImage("3",obstacle3)
    }else
    if(r===4){
      obstacle.addImage("4",obstacle4)
    }else
    if(r===5){
      obstacle.addImage("5",obstacle5)
    }else
    if(r===6){
      obstacle.addImage("6",obstacle6)
    }
    obstacle.velocityX=-(8+score/200);
    obstacle.scale=0.5;
    obstacle.lifetime=111  ;
    obstacleGroup.add(obstacle);
    
  
  }
}
  function restartGame(){
  
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  gameState=PLAY
  trex.changeAnimation("running");
  gameOver.visible=false
  restart.visible=false
  score=0
}