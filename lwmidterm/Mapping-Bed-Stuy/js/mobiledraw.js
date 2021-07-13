// Enables drawing on touch screen. Thanks to zipso http://zipso.net/a-simple-touchscreen-sketchpad-using-javascript-and-html5/
// Define some variables to keep track of the touch position
// Define some variables to keep track of the touch position


function sketchpad_touchStart() {
    getTouchPos();
    console.log('touchstart');

    if (drawstate == 'line') {
      drawLine(context,touchX,touchY,1);  
    } 

    if (drawstate == 'text') {
      console.log('textbox');
      addText(context, touchX, touchY);
    }
    

    // Prevents an additional mousedown event being triggered
    event.preventDefault();
}

function sketchpad_touchMove(e) { 
    // Update the touch co-ordinates
    getTouchPos(e);

    // During a touchmove event, unlike a mousemove event, we don't need to check if the touch is engaged, since there will always be contact with the screen by definition.
    if (drawstate == 'line') {
      drawLine(context,touchX,touchY,1); 
    }

    if (drawstate == 'text') {
      addText(context, touchX, touchY);
    }

    // Prevent a scrolling action as a result of this touchmove triggering.
    event.preventDefault();
}

// Get the touch position relative to the top-left of the canvas
// When we get the raw values of pageX and pageY below, they take into account the scrolling on the page
// but not the position relative to our target div. We'll adjust them using "target.offsetLeft" and
// "target.offsetTop" to get the correct values in relation to the top left of the canvas.
function getTouchPos(e) {
    if (!e)
        var e = event;

    if (e.touches) {
        if (e.touches.length == 1) { // Only deal with one finger
            var touch = e.touches[0]; // Get the information for finger #1
            canvasRect = canvas.getBoundingClientRect(); 
            console.log(canvasRect);
						
            touchX=touch.pageX-canvasRect.left-window.pageXOffset;
            touchY=touch.pageY-canvasRect.top-window.pageYOffset;
        }
    }
}

function sketchpad_touchEnd() {
	// Reset lastX and lastY to -1 to indicate that they are now invalid, since we have lifted the "pen"
	lastX=-1;
	lastY=-1;
}

// Keep track of the old/last position when drawing a line
// We set it to -1 at the start to indicate that we don't have a good value for it yet
var lastX,lastY=-1;

function drawLine(ctx,x,y,size) {

  // If lastX is not set, set lastX and lastY to the current position 
  if (lastX==-1) {
      lastX=x;
			lastY=y;
  }

  ctx.strokeStyle = '#002AEE';
  ctx.lineCap = "round";
  ctx.beginPath();
	ctx.moveTo(lastX,lastY);
	ctx.lineTo(x,y);
  ctx.lineWidth = size;
  ctx.stroke();
  ctx.closePath();

	// Update the last position to reference the current position
	lastX=x;
	lastY=y;
} 

function addText(ctx, x, y) {
  var message = document.getElementById('map-label').value;
  ctx.font = "16px Arial";
  ctx.strokeStyle = '#002AEE';
  ctx.fillStyle = '#002AEE';
  ctx.fillText(message,x,y);

}