function getRenderList()
{
     // TODO: map size 
	 //todo get render list from json 
	 let x = 5200;
     let y = 5200;
     let path = "gif1.gif";
     let renderSizeX= 100;
     let renderSizeY= 100;
	 let collisionSizeX= 100;
	 let collisionSizeY= 100;
	 
	 let obj = [];
	 obj[0] = {x: x, y: y, path: path, renderSizeX: renderSizeX, renderSizeY: renderSizeY, collisionSizeX: collisionSizeX, collisionSizeY: collisionSizeY};
	 obj[1] = {x: 4900, y: 5200, path: "image.png", renderSizeX: renderSizeX, renderSizeY: renderSizeY, collisionSizeX: collisionSizeX, collisionSizeY: collisionSizeY};
	 obj[2] = {x: x, y: y, path: "jpg1.jpg", renderSizeX: renderSizeX, renderSizeY: renderSizeY, collisionSizeX: collisionSizeX, collisionSizeY: collisionSizeY};
	 obj[3] = {x: 5500, y: 5600, path: "image.png", renderSizeX: renderSizeX, renderSizeY: renderSizeY, collisionSizeX: collisionSizeX, collisionSizeY: collisionSizeY};
	 obj[4] = {x: 4000, y: 5400, path: "image.png", renderSizeX: 2000, renderSizeY: 500, collisionSizeX: 2000, collisionSizeY: 500};
	 renderList.push(obj[0]); 
	 renderList.push(obj[1]); 
	 renderList.push(obj[2]); 
	 renderList.push(obj[3]); 
	renderList.push(obj[4]); 
	
	 }


var collisionTest=false;
//Client web dimensions
var clientWindowWidth = window.screen.availWidth;
var clientWindowHeight = window.screen.availHeight;

//starting position
var playerX =5000;
var playerY =5000;
//playerViewFov
const playerViewFovX = 1920;
const playerViewFovY = 1080;
//movement speed
var movementSpeed = 0.5;
// shooting range
var shootRange = 10;
////fps max per second // DESIRED FPS DIVIDED BY 1000
const fpsMax = 17; 
movementSpeed *=fpsMax;
var clicked = 0;
var renderList = [];
getRenderList();
var here = false;
var test = 0;
 

//update method for each called frame

function update() {
    
  
console.log(`PlayerX=${playerX} PlayerY=${playerY}`);
	

checkRender();
   
keyUpdate();  

console.log(here);
}
 setInterval(update, fpsMax);

 //rendering
 function checkRender()
 {
var stringRender = " ";
var collisionEntities = [];
//intializing player model
renderList[0].x = playerX;
renderList[0].y = playerY;
// check if an object is in the range of the player Fov and render it
for(let i = 0;i<renderList.length;i++)
{
	
	console.log("checkRender called");
	
	//x check
	if(renderList[i].x+renderList[i].renderSizeX>playerX-playerViewFovX/2 && renderList[i].x-renderList[i].renderSizeX/2<playerX+playerViewFovX/2)
	{
		//y check
	if(renderList[i].y+renderList[i].renderSizeY>playerY-playerViewFovY/2 && renderList[i].y-renderList[i].renderSizeY/2<playerY+playerViewFovY/2)
		{
			console.log(renderList[i].path);
			//some sorcery going on                  it was playerViewFovX/2 before
			let xRender = ((renderList[i].x-playerX)+clientWindowWidth/2)-renderList[i].renderSizeX/2;
			let yRender = ((renderList[i].y-playerY)+clientWindowHeight/2)-renderList[i].renderSizeY/2;
			let stringInput =`<img style="width:${renderList[i].renderSizeX}px;height:${renderList[i].renderSizeY}px;position:fixed;top:${yRender}px;right:${xRender}px;" src="${renderList[i].path}">`;
		 stringRender= stringRender + stringInput;	 
		 collisionEntities.push(renderList[i]);
		
		}
	}
	
}
document.getElementById("imgr").innerHTML=stringRender;
}
 //collision function
 function collisionX(id,lenght,rightOrLeft){
	 
	 let objectX = renderList[id].x;
	 let objectY = renderList[id].y;
	 
	 let objectXCollision = renderList[id].collisionSizeX/2;
	 let objectYCollision = renderList[id].collisionSizeY/2;
	 
	 let remainingMovements;
	 for(let i = 0;i<renderList.length;i++)
	 {
		if(i!=id)
		{
			if(rightOrLeft===0)
			{
				// left
				//                                 it was <Y> here						  it was<X> here
				if(Math.abs(objectY-renderList[i].y)<objectYCollision+renderList[i].collisionSizeY/2)
				{
					if(Math.abs(objectX-renderList[i].x)<objectXCollision+renderList[i].collisionSizeX/2+lenght )
					{
					 remainingMovements = lenght-(objectXCollision+renderList[i].collisionSizeX/2);
						if(objectX>renderList[i].x)
						{
							remainingMovements=lenght;
						}						
						if(remainingMovements<0)
						{
							remainingMovements=0;
						}
					}
				}				
			}
			else
			{
				// right
				// y check
				//                                 it was <Y> here						  it was<X> here
				if(Math.abs(objectY-renderList[i].y)<objectYCollision+renderList[i].collisionSizeY/2)
				{
					// x check
					if(objectX-renderList[i].x<objectXCollision+renderList[i].collisionSizeX/2+lenght && objectX-renderList[i].x>objectXCollision-renderList[i].collisionSizeX/2+lenght)
					{
						remainingMovements = lenght-(objectXCollision+renderList[i].collisionSizeX/2);
						if(remainingMovements<0)
						{
							remainingMovements=0;
						}
					}
				}
			}
		}
	 }
	 
	 if (typeof remainingMovements === 'undefined')
	 {
		 remainingMovements=lenght;
	 }
 return remainingMovements;
 }
 
 function collisionY(id,lenght,topOrBottom){
 let objectX = renderList[id].x;
	 let objectY = renderList[id].y;
	 
	 let objectXCollision = renderList[id].collisionSizeX/2;
	 let objectYCollision = renderList[id].collisionSizeY/2;
	 
	 let remainingMovements;
	 for(let i = 0;i<renderList.length;i++)
	 {
		if(i!=id)
		{
			if(topOrBottom===0)
			{
				// left
				
				if(Math.abs(objectX-renderList[i].x)<objectXCollision+renderList[i].collisionSizeX/2)
				{
					if(Math.abs(objectY-renderList[i].y)<objectYCollision+renderList[i].collisionSizeY/2+lenght )
					{
					 let a = lenght-(objectYCollision+renderList[i].collisionSizeY/2);
						if (typeof remainingMovements === 'undefined')
							{
								remainingMovements=a;
							}
						if(a>remainingMovements)
						{
							remainingMovements=a;
						}
						if(objectY>renderList[i].y)
						{
							remainingMovements=lenght;
						}
						if(remainingMovements<0)
						{
							remainingMovements=0;
						}
					}
				}
			}
			else
			{
				// right
				// y check
				//                                 it was <Y> here						  it was<X> here
				if(Math.abs(objectX-renderList[i].x)<objectXCollision+renderList[i].collisionSizeX/2)
				{
					// x check
					if(objectY-renderList[i].y<objectYCollision+renderList[i].collisionSizeY/2+lenght && objectY-renderList[i].y>objectYCollision-renderList[i].collisionSizeY/2+lenght)
					{
						remainingMovements = lenght-(objectYCollision+renderList[i].collisionSizeY/2);
						if(remainingMovements<0)
						{
							remainingMovements=0;
						}
					}
				}
			}
		}
	 }
	 
	 if (typeof remainingMovements === 'undefined')
	 {
		 remainingMovements=lenght;
	 }
 return remainingMovements;
 }	
	 
//control functions

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;

function keyDownHandler(event) {
    if(event.keyCode == 39) {
        rightPressed = true;
    }
    else if(event.keyCode == 37) {
        leftPressed = true;
    }
    if(event.keyCode == 40) {
    	downPressed = true;
    }
    else if(event.keyCode == 38) {
    	upPressed = true;
    }
}

function keyUpHandler(event) {
    if(event.keyCode == 39) {
        rightPressed = false;
    }
    else if(event.keyCode == 37) {
        leftPressed = false;
    }
    if(event.keyCode == 40) {
    	downPressed = false;
    }
    else if(event.keyCode == 38) {
    	upPressed = false;
    }
}

function keyUpdate()
{
	 //Control update
	if(rightPressed) {
       //1 because right
		 let speed = collisionX(0,movementSpeed,1);
		
		playerX -= speed;
    }
    else if(leftPressed) {
        let speed = collisionX(0,movementSpeed,0);
		playerX += speed;
    }
    if(downPressed) {
        let speed = collisionY(0,movementSpeed,0);
		playerY += speed;
    }
    else if(upPressed) {
        let speed = collisionY(0,movementSpeed,1);
		playerY -= speed;
    }
	// end control update
}
// mouse functions
function OnMouseClick(event) {
 
  let mouseX = event.clientX;
  let mouseY = event.clientY;
  
  
}

document.addEventListener("click", OnMouseClick);
			
			