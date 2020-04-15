//Init Consts
const BACKGROUND = document.getElementById("isoBackground");
const FOREGROUND = document.getElementById("world");
const FPS = 144;
const TICK = 0;
const WORLDWIDTH = 1080;
const WORLDHEIGHT = 720;
const PLAYERWIDTH = 30;
const PLAYERHEIGHT = 30;
const DEFAULTSPEED = 0.01;
const BOUNDWIDTH = PLAYERWIDTH / 2;
const BOUNDHEIGHT = PLAYERHEIGHT / 2;
const VALIDWIDTH = WORLDWIDTH - BOUNDWIDTH;
const VALIDHEIGHT = WORLDHEIGHT - BOUNDHEIGHT;
const STARTX = 225;
const STARTY = 225;
//init Lets
let playerXvalue = 0;
let playerYvalue = 0;
let speed = DEFAULTSPEED;
let diagonalSpeed = DEFAULTSPEED / 2;
let rotate = 0;
let keysPressed = {};
//let canvasRect; 
//Init vars
var tick=0;
var lastFrameTimeMs = 0;
var objectsOnScreen = [];
var background = document.getElementById("isoBackground");
var foreground = document.getElementById("world");
var isoBackground = new Isomer(BACKGROUND);
var iso = new Isomer(FOREGROUND);
var Point = Isomer.Point;
var Path = Isomer.Path;
var Shape = Isomer.Shape;
var Color = Isomer.Color;
var canvasRect = BACKGROUND.getBoundingClientRect();
var charX = 0;
var charY = 0;
var charZ = 0;
var charLastX= 0;
var charLastY= 0;
var charLastZ = 0;
var charCurrentX = 0;
var charCurrentY = 0;
var charCurrentZ = 0;
var charColor = new Color(20, 20, 20);
var lastCall = 0;
//Init Game
function startGame() {
  console.log('game started');
  makeGrid(30, 30, -8, new Color(111, 111, 111, 1));
  //makeGrid(16, 16, 0, new Color(10, 10, 10, 1));
  //setInterval(handleMovement, TICK);
  background.addEventListener('click', handleWorldClick);
  //foreground.addEventListener('click',handleWorldClick);
  window.addEventListener('keyup', handleKeyUp);
  window.addEventListener('keydown', throttle(handleKeyDown,100));
  background.addEventListener('contextmenu', handleWorldRightClick);
  // foreground.addEventListener('contextmenu', handleWorldRightClick); 
  requestAnimationFrame(gameLoop);
}

function gameLoop(timestamp){
  /* FPS LiMITER for testing
  if (timestamp < lastFrameTimeMs + (1000 / FPS)) {
    requestAnimationFrame(gameLoop);
    return;
  }*/

  console.log(tick);
  delta = timestamp - lastFrameTimeMs;
  lastFrameTimeMs = timestamp;
  update(delta);
  drawForeground();
  requestAnimationFrame(gameLoop);
}
function update(delta){
  if(charLastX !== charCurrentX){
    if(charLastX  <  charCurrentX ){
      if((charLastX + speed * delta) < charCurrentX){
        charX += speed * delta;
        charLastX = charX;
      }else{
        charX = charCurrentX;
        charLastX = charCurrentX;
      }      
    }
    if(charLastX  >  charCurrentX ){
      if((charLastX - speed * delta) > charCurrentX){
        charX -= speed * delta;
        charLastX = charX;
      }else{
        charX = charCurrentX;
        charLastX = charCurrentX;
      }      
    }

  }
  if(charLastY !== charCurrentY){
    if(charLastY  <  charCurrentY ){
      if((charLastY + speed * delta) < charCurrentY){
        charY += speed * delta;
        charLastY = charY;
      }else{
        charY = charCurrentY;
        charLastY = charCurrentY;
      }      
    }
    if(charLastY  >  charCurrentY ){
      if((charLastY - speed * delta) > charCurrentY){
        charY -= speed * delta;
        charLastY = charY;
      }else{
        charY = charCurrentY;
        charLastY = charCurrentY;
      }      
    }
  }
  if(charLastZ !== charCurrentZ){
    if(charLastZ  <  charCurrentZ ){
      if((charLastZ + speed * delta) < charCurrentZ){
        charZ += speed * delta;
        charLastZ = charZ;
      }else{
        charZ = charCurrentZ;
        charLastZ = charCurrentZ;
      }      
    }
    if(charLastZ  >  charCurrentZ ){
      if((charLastZ - speed * delta) > charCurrentZ){
        charZ -= speed * delta;
        charLastZ = charZ;
      }else{
        charZ = charCurrentZ;
        charLastZ = charCurrentZ;
      }      
    }
  } 
 
  
  
}
function drawForeground() {
  iso.canvas.clear();
  
  iso.add(Shape.Prism(new Point(charX, charY, charZ), 1, 1, 2), charColor);
    //Swconsole.log(Shape.paths);

  // iso.add(Shape.Prism(new Point(2, 4, 0)));//
  // iso.add(Shape.Prism(new Point(4, 2, 0)));
}

function component(width, height, depth, x, y, z, color, type) {
    
  this.type = type;
  if (type == "image") {
      this.image = new Image();
      this.image.src = color;
  }
  this.width = width;
  this.height = height;
  this.color = color;
  this.speed = 0;
  this.angle = 0;
  this.moveAngle = 0;
  this.lastX = STARTX;
  this.lastY = STARTY;
  this.x = x;
  this.y = y;
  this.targetX = null;
  this.targetY = null;
  this.destinationX = null;
  this.destinationY = null;
  this.update = function () {
      if (type == "image") {
          ctx.drawImage(this.image, 
              this.x, 
              this.y,
              this.width, this.height);
      } else {
      ctx = world.context;
      ctx.clearRect(this.width / -2, this.height / -2, this.width, this.height);
      ctx.save();
    
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.fillStyle = color;
      ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);

      ctx.restore();
      }
  }
  this.move = function () {        
      this.x += this.speed;
      this.y -= this.speed;
  }
  this.attack = function() {
      ctx = world.context;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(this.x,this.y);
      ctx.lineTo(this.targetX, this.targetY);
      ctx.stroke();
      ctx.restore();
  }
  this.setTarget = function(xx, yy){
      this.targetX = xx;
      this.targetY = yy;
      console.log(`target is at x:${x}  y:${y}`);
  
  }
  this.clearTarget = function(){
      this.targetX = null;
      this.targety = null;
  }
  
}
//--Helper Functions ---------------------------------------------------------\/
function randomColor() {


  return new Color(
    parseInt(Math.random() * 256),
    parseInt(Math.random() * 256),
    parseInt(Math.random() * 256));
}
function verticalBars(){
  //ctx = background.getContext("2d");
  ctx = document.getElementById('gridTest').getContext('2d');
  for (x = 0; x < 2160 + 1; x+=59) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 1440);
    ctx.stroke();

  }
}
function makeGrid(xSize, ySize, zHeight, gridColor) {
  
  for (x = 0; x < xSize + 1; x++) {
    isoBackground.add(new Path([
      new Point(x, 0, zHeight),
      new Point(x, xSize, zHeight),
      new Point(x, 0, zHeight)
    ]), gridColor);

  }

 
  for (y = 0; y < ySize + 1; y++) {
    isoBackground.add(new Path([
      new Point(0, y, zHeight),
      new Point(ySize, y, zHeight),
      new Point(0, y, zHeight)
    ]), gridColor);
  }
}
//--Helper Functions ---------------------------------------------------------/\

//--Event Handlers ---------------------------------------------------------\/
function handleWorldRightClick(event) {
  let xx = event.clientX - canvasRect.left;
  let yy = event.clientY - canvasRect.top;
  event.preventDefault();
  console.log(`you right clicked at x:${xx} y:${yy}`)
  return false;
}
function handleWorldClick(event) {
  if (keysPressed['control']) {
    charX = (event.clientX - canvasRect.left) / 60;
    charY = (event.clientY - canvasRect.top) / 60;
    //WORK HERE MORE MIGHT BE A SOLUTION
  }
}
function handleKeyDown(event) {
  //  console.log(`you pressed the "${event.key}" key`);
  // add key to the array of pressed keys
  event.preventDefault();

  keysPressed[event.key.toLowerCase()] = true;

  console.log(Object.keys(keysPressed).length);
  // console.log(keysPressed);
  if (event.key.match(/[wasdWASD]/)) {
    //console.log(`you pressed w a s or d!`);
    handleMovement(event);
  } else {
    handleOtherKeys(event);
  }
}
function handleKeyUp(event) {
  delete keysPressed[event.key.toLowerCase()];
  //handleMovement(event);

}
function handleOtherKeys(key) {
  console.log(`you didnt press an "action" key`);
}
//--Event Handlers ---------------------------------------------------------/\
function throttle(func, interval) {
  
  return function() {
      var now = Date.now();
      if (lastCall + interval < now) {
          lastCall = now;
          return func.apply(this, arguments);
      }
  };
}

function handleMovement(key) {
  var singleKey = (Object.keys(keysPressed).length === 1) ? true : false;
    
  switch (true) {
    case (keysPressed['a'] && keysPressed['d']):
      break;
    case (keysPressed['d'] && keysPressed['s']):
      charCurrentY--;
      charCurrentX--;
      break;
    case (keysPressed['a'] && keysPressed['s']):
      charCurrentX --;
      charCurrentY ++;
      break;
    case (keysPressed['w'] && keysPressed['a']):
      charCurrentX++;
      charCurrentY++;
      break;
    case (keysPressed['w'] && keysPressed['d']):
      charCurrentX ++;
      charCurrentY --;
      break;
      //------------------SINGLE KEYS-------------------------
    case (keysPressed['w'] && singleKey):
      charCurrentX ++;
      break;
    case (keysPressed['a'] && singleKey):
      charCurrentY ++;
      break;
    case (keysPressed['s'] && singleKey):
      charCurrentX --;
      break;
    case (keysPressed['d'] && singleKey):
      charCurrentY --;
      break;
    default:
      break;
  }
  charColor = randomColor();
  console.log(`you moved to x:${charCurrentX} y:${charCurrentY} z:${charCurrentZ} `);
}