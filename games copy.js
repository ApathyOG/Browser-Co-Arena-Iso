//Init Consts
const FPS = 60;
const TICK = 16;
const WORLDWIDTH = 1080;
const WORLDHEIGHT = 720;
const PLAYERWIDTH = 30;
const PLAYERHEIGHT = 30;
const DEFAULTSPEED = 30;
const BOUNDWIDTH = PLAYERWIDTH / 2;
const BOUNDHEIGHT  = PLAYERHEIGHT / 2;
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
let canvasRect; 
//Init vars
var iso = new Isomer(document.getElementById("canvas"));
var Point = Isomer.Point;
var Path = Isomer.Path;
var Shape = Isomer.Shape;
var Color = Isomer.Color;
var x = 0;
var y = 0;
function startGame() {
    //character = new component(PLAYERWIDTH, PLAYERHEIGHT, "red", STARTX, STARTY,"trojan");
    //iso = new Isomer(document)
    console.log("hey, you started thhe game");
    //world.start(); 
    //canvasRect = world.canvas.getBoundingClientRect();
    iso.add(Shape.Prism(new Point(x, y, 0), 1, 1, 2));
}


//window.addEventListener('click', updateCanvas);
/*
world = {    
    iso: new Isomer(document.getElementById('canvas')),
    canvas: new 
    
    start: function () {
        //this.canvas.classList.add('world');
        console.log(iso);
        this.iso.width = WORLDWIDTH;
        this.iso.height = WORLDHEIGHT;
        this.context = this.iso.canvas.getContext("2d");
        document.body.appendChild(this.iso);
        this.frameNo = 0;
        this.interval = setInterval(updateWorld, TICK);
        //listeners
        this.iso.addEventListener('click',handleWorldClick);
        this.iso.addEventListener('keyup', handleKeyUp);
        this.iso.addEventListener('keydown',handleKeyDown);
        this.iso.addEventListener('contextmenu', handleWorldRightClick); 
        //this.canvas.addEventListener('mousemove',showCoords);       
    },  
    stop: function () {
        clearInterval(this.interval);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
}
*/
//init game


function updateCanvas(){
    iso.canvas.clear();
    x++;
    
    iso.add(Shape.Prism(new Point(x, y, 0), 1, 1, 2));
}

function handleMovement(key){   
    let yDown = character.y - speed;
    let yUp = character.y + speed;
    let xLeft =character.x - speed ;
    let xRight = character.x + speed;
    
  switch(true) {
        case (keysPressed['a'] && keysPressed['d']):
            break;
        case (keysPressed['d'] && keysPressed['s']):
           

            if((yUp  <= VALIDHEIGHT)&&(xRight <= VALIDWIDTH)){
                character.y += diagonalSpeed;
                character.x += diagonalSpeed;                
            }
            character.angle = (135 * Math.PI / 180);
            break;
        case (keysPressed['a'] && keysPressed['s']):
            if(((yDown)  <= VALIDHEIGHT)&&(xLeft >= BOUNDWIDTH)){
                character.y+= diagonalSpeed;
                character.x -= diagonalSpeed;                
            }
            character.angle = (225 * Math.PI / 180);
            break;
        case (keysPressed['w'] && keysPressed['a']):
            if((yDown >= BOUNDHEIGHT)&&(xLeft >= 0)){
                character.y-= diagonalSpeed;
                character.x -= diagonalSpeed;                
            }
            character.angle = (315 * Math.PI / 180);
            break;
        case (keysPressed['w'] && keysPressed['d']):
            if(((yDown)  >= BOUNDHEIGHT)&&(xRight <= VALIDWIDTH)){
                character.y-= diagonalSpeed;
                character.x += diagonalSpeed;                
            }
            character.angle = (45 * Math.PI / 180);
            break;
        case (keysPressed['w'] ):                     
            if((yDown)  >= BOUNDHEIGHT){
                character.y-= speed;                
            }else{
                character.y = BOUNDHEIGHT;
            }
            character.angle = 0;
            break;
        case (keysPressed['a']):              
            if(xLeft >= BOUNDWIDTH){
                character.x-= speed;
            }else{
                character.x = BOUNDWIDTH;
            }
            character.angle = (270 * Math.PI / 180);
          break;
        case (keysPressed['s']):
            if((character.y + speed) <= VALIDHEIGHT){
               character.y += speed; 
            } else {
                character.y = VALIDHEIGHT;
            }
            character.angle = (180 * Math.PI / 180);                
          break;
        case (keysPressed['d']): 
            if(xRight <= VALIDWIDTH){
                character.x += speed;
            } else{
                character.x = VALIDWIDTH;
            }
            character.angle = (90 * Math.PI / 180);
          break;
                 
        default:
         break;
      } 
      console.log(`you are currently at x:${character.x} y:${character.y} `);

}