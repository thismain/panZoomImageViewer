document.body.style.backgroundColor='#ffffff';
document.body.style.overflow='hidden';
document.body.style.margin='0px';
document.body.addEventListener("keydown", keydowner);
document.body.addEventListener("keyup", keyupper);

var imma;
var sliding=false;
var slideZooming=false;
var slideZoomTick=0;
var info=false;
var imRatio=1;
var bestFit=true;
var zoom=1;
var oldx=0, oldy=0;
var dragging=false;
var altKey=false;
var w=window.innerWidth;
var h=window.innerHeight; 
var zoomW=w, zoomH=h, oldZoomW=zoomW, oldZoomH=zoomH;
var lefter=0, topper=0, zoomLeft=0, zoomTop=0;

window.addEventListener('resize',onWindowResize,false);

function onWindowResize(){
w=window.innerWidth;
h=window.innerHeight;
imDimSetter();
}//end on window resize


function mousedowner(event){
event.preventDefault();
imma.style.cursor='hand';
if(event.which==2){toggleFullScreen();}
if(event.which==1){dragging=true;}
oldx=event.clientX; 
oldy=event.clientY; 
}//end mousedowner


function mouseupper(event){
event.preventDefault();
imma.style.cursor='hand';
dragging=false;
}//end mouseupper


function mousemover(event){ 
event.preventDefault();
imma.style.cursor='hand';
if(dragging){ 
lefter+=event.clientX-oldx;
topper+=event.clientY-oldy;

imma.style.left=zoomLeft+lefter +'px'; 
imma.style.top=zoomTop+topper +'px'; 
oldx=event.clientX;
oldy=event.clientY;

}}//end mousemover



function mousewheeler(event, auto){
event.preventDefault();
imma.style.cursor='hand';

if(auto){delta=1;}else{
delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
}

if(delta>0){ zoom=1.2; }else{ zoom=.8; 
if(zoomW<20||zoomH<20){zoom=1;}
}
if(auto){
var mousex=window.innerWidth/2;
var mousey=window.innerHeight/1;
}else{
var mousex=event.clientX;
var mousey=event.clientY;
}
var L=zoomLeft+lefter;
var T=zoomTop+topper;
var mulx=((mousex-L)/zoomW);
var muly=((mousey-T)/zoomH);

zoomW*=zoom;
zoomH*=zoom;

zoomLeft+=(oldZoomW-zoomW)*mulx;
zoomTop+=(oldZoomH-zoomH)*muly;

oldZoomW=zoomW;
oldZoomH=zoomH;

imma.style.width=zoomW+'px';
imma.style.height=zoomH+'px';

imma.style.left=zoomLeft+lefter +'px'; 
imma.style.top=zoomTop+topper +'px'; 

}//end mousewheeler


function keydowner(event){
if(event.keyCode==90){altKey=true;} //z (alt)
switch(event.keyCode ){
case 65: //a default view
imDimSetter();
break;
case 66: //b 
bestFit=!bestFit;
imDimSetter();
break;

}
}//end keydowner

function keyupper(event){
if(event.keyCode==90){altKey=false;} //z (alt)
switch(event.keyCode ){
}
}//end keyupper

function doubleClicker(event){
event.preventDefault();
imma.style.cursor='hand';
bestFit=!bestFit;imDimSetter();
}//end doubleClicker


var imurl=document.body.firstChild.src;

document.body.removeChild(document.body.firstChild);
imma=document.createElement("IMG");
imma.setAttribute("src", imurl);
document.body.appendChild(imma);


document.body.firstChild.onload=function(){
imma=this;
imma.style.position='absolute';
imma.style.left='0px';
imma.style.top='0px';
	
imma.onmousedown=function(){mousedowner(event);}
imma.onmousemove=function(){mousemover(event);}
imma.onmouseup=function(){mouseupper(event);}
imma.onmousewheel=function(){mousewheeler(event);}
imma.ondblclick=function(){doubleClicker(event);}

imma.style.width=w+'px';
imma.style.height=h+'px';
imma.style.left='0px';
imma.style.top='0px';

imDimSetter();
}//end firstChild onload


function imDimSetter(){
zoom=1,zoomLeft=0,zoomTop=0;

w=imma.naturalWidth, h=imma.naturalHeight; 

imRatio=w/h; 
if(bestFit){h=window.innerHeight; w=h*imRatio; }

topper=window.innerHeight/2-h/2;
imma.style.top=topper+'px';
lefter=window.innerWidth/2-w/2;
imma.style.left=lefter+'px';

zoomW=w, zoomH=h, oldZoomW=zoomW, oldZoomH=zoomH;
imma.style.width=w+'px';
imma.style.height=h+'px';

}//end imDimSetter


function isFullScreen(){
return (document.fullScreenElement && document.fullScreenElement !== null)
|| document.mozFullScreen
|| document.webkitIsFullScreen;
}//end is full screen

function requestFullScreen(){
var el=document.documentElement;
var rfs=el.requestFullscreen
|| el.webkitRequestFullScreen
|| el.mozRequestFullScreen
|| el.msRequestFullscreen;
rfs.call(el);
}//end request full screen 

function exitFullScreen(){
var d=document;
var rfs=d.exitFullscreen
|| d.webkitExitFullscreen
|| d.mozCancelFullScreen
|| d.msExitFullscreen ;
rfs.call(d);
}//end exit fullscreen

function toggleFullScreen(){
if(isFullScreen()){exitFullScreen();
}else{requestFullScreen();
}
}//end toggle full screen

