var trex, trex_runs;
var edges;
var ground;
var groundimage;
var ig;
var cloudimage;
var o1, o2, o3, o4, o5, o6;
var og;
var cl;
var gamestate;
var jump;
var die;
var checkpoint;
var score;
var raptor;
var raptorimage;
var hs;
var b;
var black;
function preload() {
  groundimage = loadImage("ground.png")
  trex_runs = loadAnimation("trex1.png", "trex2.png", "trex3.png")
  cloudimage = loadImage("cloud.png")
  o1 = loadImage("obstacle1.png")
  o2 = loadImage("obstacle2.png")
  o3 = loadImage("obstacle3.png")
  o4 = loadImage("obstacle4.png")
  o5 = loadImage("obstacle5.png")
  o6 = loadImage("obstacle6.png")
  trex2 = loadAnimation("trex.png")
  rs = loadImage("restart.png")
  gm = loadImage("gameOver.png")
  jump = loadSound("jump.mp3")
  die = loadSound("die.mp3")
  checkpoint = loadSound("checkPoint.mp3")
  raptorimage= loadAnimation ("Aviraptor1.png","Aviraptor2.png")
  raptorimage2= loadAnimation ("Aviraptor1.png")
}
function b12(){
  
}
function raptor (){
 if (frameCount%200==0) {
 var r=createSprite(width,Math.round(random(50,height-40)),10,20)  
 r.velocityX=-2
   r.addAnimation("flys",raptorimage)
   r.addAnimation("dies",raptorimage2)
   r.scale=0.5
   r.lifetime=width/2+30
   ra.add(r)
 }
}
function ob() {
  if (frameCount % 130 == 0) {
    var o = createSprite(width, height-30, 10, 10)
    o.velocityX = -2
    var rb = Math.round(random(1, 6))
    switch (rb) {
      case 1:
        o.addImage(o1);
        o.scale = 0.6 
        break;
      case 2:
        o.addImage(o2);
        o.scale = 0.5
        break;
      case 3:
        o.addImage(o3);
        o.scale = 0.4 
        break;
      case 4:
        o.addImage(o4);
        o.scale = 0.4
        break;
      case 5:
        o.addImage(o5);
        o.scale = 0.3
        break;
      case 6:
        o.addImage(o6);
        o.scale = 0.3
        break;
      default:
    }
    o.lifetime = width+50/2
    og.add(o)
  }
}

function cloud() {
  if (frameCount % 60 == 0) {
    var c = createSprite(width, Math.round(random(10, height-100)), 10, 10)
    c.velocityX = -2
    c.addImage(cloudimage)
    g.depth = trex.depth
    r.depth = trex.depth
    c.depth = trex.depth
    trex.depth = trex.depth + 1
    c.lifetime = width/2+20
    cl.add(c)
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  trex = createSprite(40, height-30, 20, 20);
  trex.scale = 0.5;
  trex.addAnimation("runs", trex_runs);
  trex.addAnimation("die", trex2)
  trex.debug=false 
  ground = createSprite(width/2, height-20, width, 20)
  ground.addImage(groundimage)
  gamestate = "play"
  hs=0
  b=255
  r = createSprite(width/2, height/2, 10, 10)
  r.addImage(rs)
  r.scale = 0.25
  r.visible = false
  g = createSprite(width/2, (height/2)-20, 50, 10)
  g.addImage(gm)
  g.scale = 0.35
  g.visible = false
  ig = createSprite(width/2, height-5, width, 10);
  ig.visible = false
  edges = createEdgeSprites();
  og = new Group();
  cl = new Group();
  ra = new Group();
  score = 0
}

function draw() {
  background(b);
  if (gamestate == "play") {
    cloud()
    ob()
    raptor()
    if ((keyDown("space")||touches.length>0) && trex.y > height-34) {
      trex.velocityY = -12
      jump.play()
    }
    if (frameCount % 2 == 0) {
      score = score + 1
    }

    if (score % 100 == 0) {
      checkpoint.play()
    }
    trex.velocityY = trex.velocityY + 0.5
    ground.velocityX = -2;
    if (ground.x < 0) {
      ground.x = ground.width / 2
    }
    if (score%200==0){
     black=1 
    }
    if (black>0){
    b=0
      black+=1
      if (black==100){
        b=255
        black=0
      }
    }
    if (trex.isTouching(og)||trex.isTouching(ra)) {
      die.play()
      gamestate = "end"
    }


  } else if (gamestate == "end") {
    og.setVelocityXEach(0)
    cl.setVelocityXEach(0)
    ra.setVelocityXEach(0)
    cl.setLifetimeEach(-1)
    ra.setLifetimeEach(-1)
    trex.velocityY=0
    ground.velocityX = 0
    og.setLifetimeEach(-1)
    trex.changeAnimation("die")
    //ra.setAnimationEach(raptorimage2)
    r.visible = true
    g.visible = true
    if (score>hs){
      hs=score
    }
    if (mousePressedOver(r)||touches.length>0) {
      score = 0
      r.visible = false
      g.visible = false
      cl.destroyEach();
      og.destroyEach();
      ra.destroyEach();
      trex.changeAnimation("runs")
      gamestate = "play"
    }
  }

  trex.collide(ig)
  drawSprites();
  textSize(20)
  text("High Score:"+hs+"\tScore:" + score, width-260, 30)
}