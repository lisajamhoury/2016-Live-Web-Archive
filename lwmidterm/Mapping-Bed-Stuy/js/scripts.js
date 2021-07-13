var socket = io.connect();
var dataUrl;
var canvas;
var canvasRect;
var mouseDown = false;
var allMaps = [];
var swatches = [];
var touchX,touchY;
var drawstate = 'line';

socket.on('connect', function() {
	console.log("Connected");
});

socket.on('maplist', function(mapimages) {
	console.log(mapimages);
	for (var i = 0; i < mapimages.length; i++) {
		createImage(mapimages[i]);
		createLabel(mapimages[i]);
		allMaps.push(mapimages[i]);
	}
	// console.log(mapimages.length);
	// console.log(allMaps.length);

});

socket.on('updatedmaplist', function(mapimages) {
	if (mapimages.length == allMaps.length) {
		console.log("same length");
	} else {
		console.log("different");
		var difference = mapimages.length - allMaps.length;
		console.log(difference);
		var lastPosition = allMaps.length;
		console.log(lastPosition);
		for (var k = 0; k < difference; k++ ) {
			console.log('addingnew');
			console.log(mapimages[lastPosition]);
			createImage(mapimages[lastPosition + k]);
			createLabel(mapimages[lastPosition + k]);
			allMaps.push(mapimages[lastPosition + k]);
		}
		// console.log(allMaps);
	}
});

var createImage= function(mapimage) {
	var newImg = document.createElement("img");
	var imagepath = 'map-images/' + mapimage.imgname;
	newImg.setAttribute("id", mapimage._id);
	newImg.setAttribute("class", "added-map-image");
	newImg.src = imagepath;
	var mainDiv = document.getElementById("maps");
	mainDiv.appendChild(newImg);
}

var createLabel= function(mapimage) {
	var newLabel = document.createElement("div");
	var labelDivId = 'label' + mapimage._id;
	var imageDivId = mapimage._id;
	newLabel.setAttribute("id", labelDivId);
	newLabel.setAttribute("class", "added-map-label");
	newLabel.setAttribute("onmouseover", "showMapImg(this.id)");
	newLabel.setAttribute("onmouseout", "hideMapImg(this.id)");
	newLabel.setAttribute("refid", mapimage._id); //unable to access this
	newLabel.innerHTML = 'Map:' + mapimage.mapname;
	var mainDiv = document.getElementById("map-images");
	mainDiv.appendChild(newLabel);
}

var showMapImg = function (e) {
	var refID = e.substring(5);
	document.getElementById(refID).style.display = "block";
	document.getElementById(e).style.backgroundColor = "#9CFAA5";
}
    
var hideMapImg = function (e) {
	var refID = e.substring(5);
	document.getElementById(refID).style.display = "none";	
	document.getElementById(e).style.backgroundColor = "#fff";
}	

var initCanvas = function() {
	canvas = document.getElementById('myCanvas');
	context = canvas.getContext('2d');
	context.clearRect(0,0,canvas.width,canvas.height);	
	canvas.addEventListener('mousemove', function(evt) {
	//console.log("mousemove " + evt.clientX + " " + evt.clientY);
		canvasRect = canvas.getBoundingClientRect(); 
		y = evt.clientY - canvasRect.top;
		x = evt.clientX - canvasRect.left;
		if (mouseDown){
			draw(x,y);
		}
		else{
			py = evt.clientY - canvasRect.top;
			px = evt.clientX - canvasRect.left;
		}
	}, false);			
};
var px;
var py;
var draw = function(xval, yval) {
	context.beginPath();
	context.strokeStyle='#002AEE';
	context.moveTo(px,py);
	context.lineTo(xval,yval);
	context.stroke();
	px = xval;
	py = yval;
};

function initPalette(){
	var swatch = document.getElementById('color-palette'),
	  swatchLeft = swatch.offsetLeft,
		swatchTop = swatch.offsetTop,
		swatchCtx0 = swatch.getContext('2d'),
		swatchCtx1 = swatch.getContext('2d'),
		swatchCtx2 = swatch.getContext('2d'),
		swatchCtx3 = swatch.getContext('2d'),
		swatchCtx4 = swatch.getContext('2d'),
		swatchCtx5 = swatch.getContext('2d');
	swatches.push(
		{
	    	color: '#EE4035',
	    	top: 5,
	    	left: 20,
	    	radius: 15
		},
		{
	    	color: '#F37736',
	    	top: 200,
	    	left: 200,
	    	radius: 40
		},
		{
	    	color: '#FDF498',
	    	top: 300,
	    	left: 200,
	    	radius: 40
		},
		{
	    	color: '#7BC043',
	    	top: 400,
	    	left: 200,
	    	radius: 40
		},
		{
	    	color: '#0392CF',
	    	top: 500,
	    	left: 200,
	    	radius: 40
		}

	
	);
	for (var i=0; i < swatches.length; i++){
		if (i==0){
			swatchCtx0.fillStyle = swatches[i].color;
			swatchCtx0.beginPath();
			swatchCtx0.arc(swatches[i].left, swatches[i].top, swatches[i].radius,0,2*Math.PI);
			swatchCtx0.fillStyle = swatches[0].color;
			swatchCtx0.fill();
		}
		else if (i==1){
			swatchCtx1.fillStyle = swatches[i].color;
			swatchCtx1.beginPath();
			swatchCtx1.arc(swatches[i].left, swatches[i].top, swatches[i].radius, 0,2*Math.PI);
			swatchCtx1.fillStyle = swatches[1].color;
			swatchCtx1.fill();
		}
		else if (i==2){
			swatchCtx2.fillStyle = swatches[i].color;
			swatchCtx2.beginPath();
			swatchCtx2.arc(swatches[i].left, swatches[i].top, swatches[i].radius, 0,2*Math.PI);
			swatchCtx2.fillStyle = swatches[2].color;
			swatchCtx2.fill();
		}
		else if (i==3){
			swatchCtx3.fillStyle = swatches[i].color;
			swatchCtx3.beginPath();
			swatchCtx3.arc(swatches[i].left, swatches[i].top, swatches[i].radius, 0,2*Math.PI);
			swatchCtx3.fillStyle = swatches[3].color;
			swatchCtx3.fill();
		}
		else if (i==4){
			swatchCtx4.fillStyle = swatches[i].color;
			swatchCtx4.beginPath();
			swatchCtx4.arc(swatches[i].left, swatches[i].top, swatches[i].radius, 0,2*Math.PI);
			swatchCtx4.fillStyle = swatches[4].color;
			swatchCtx4.fill();
		}
		else {
			swatchCtx5.fillStyle = swatches[i].color;
			swatchCtx5.beginPath();
			swatchCtx5.arc(swatches[i].left, swatches[i].top, swatches[i].radius, 0,2*Math.PI);
			swatchCtx5.fillStyle = swatches[5].color;
			swatchCtx5.fill();
			swatchCtx5.stroke();
		}
	};
	document.getElementById('color-palette').addEventListener('click', function(e){
		var swatch = document.getElementById('color-palette'),
				swatchLeft = swatch.offsetLeft,
					swatchTop = swatch.offsetTop,
				swatchCtx = swatch.getContext('2d'),
				swatches = [];
			swatch.addEventListener('click', function (e){
				var x = event.pageX - swatchLeft,
					y = event.pageY - swatchTop;
					console.log('x: ' + x);
					console.log('y: ' + y);
					console.log(swatches.length);
				for (var i = 0; i < swatches.length; i++){
				console.log('check 1');
				if (y > swatch.top && y < swatch.top + swatch.height && x > swatch.left && x < swatch.left + swatch.width){
					// some function that changes the other canvas's draw color
					alert("swatch clicked");
				}
				};
			});
	});
}

function init () {
    L.mapbox.accessToken = 'pk.eyJ1IjoibGlzYWphbWhvdXJ5IiwiYSI6ImNpZzV4NHgzcTRrdHp0d2x2cHRvdjVhY3gifQ.ftTsm2W5PxBCE83mpl0w6Q';
    // Construct a bounding box for this map that the user cannot
    // move out of
    var southWest = L.latLng(40.684865, -73.956395),
        northEast = L.latLng(40.691602, -73.942702),
        bounds = L.latLngBounds(southWest, northEast);
    var map = L.mapbox.map('map', 'lisajamhoury.6d08acd5', {
        maxBounds: bounds,
        maxZoom: 17,
        minZoom: 17,
        dragging: false,
        zoomControl: false,
        attributionControl: false
    });
    // zoom the map to that bounding box
    map.fitBounds(bounds);

    socket.emit('listmaps', {});

    document.getElementById('viewing').addEventListener('click', function(e) {
    	console.log('viewing');
    	e.preventDefault(); 
    	
    	document.getElementById('viewing').style.backgroundColor = '#ccc';
    	document.getElementById('drawing').style.backgroundColor = '#fff';
    	document.getElementById('drawing-options').style.display = 'none';
			var showPanel = document.getElementById('view');
    	var hidePanel = document.getElementById('draw');
    	var showDiv = document.getElementById('maps');
    	var hideDiv = document.getElementById('canvas-holder');
    	
    	chooseSidebar(showPanel, hidePanel, showDiv, hideDiv);

    	socket.emit('viewing', {});

		});

    document.getElementById('drawing').addEventListener('click', function(e) {
    	// console.log('drawing');
    	e.preventDefault(); 

    	document.getElementById('drawing').style.backgroundColor = '#ccc';
    	document.getElementById('viewing').style.backgroundColor = '#fff';
    	document.getElementById('drawing-options').style.display = 'block';
			var showPanel = document.getElementById('draw');
    	var hidePanel = document.getElementById('view');
    	var showDiv = document.getElementById('canvas-holder');
    	var hideDiv = document.getElementById('maps');
    	
    	chooseSidebar(showPanel, hidePanel, showDiv, hideDiv);
		});	


    document.getElementById('submit-map').addEventListener('click', function(e) {
    	var png = ReImg.fromCanvas(document.getElementById('myCanvas')).toPng();
    	var name = document.getElementById('user-name').value;
    	document.getElementById('submit-map').innerHTML = "submitted!";
    	console.log(name);
    	socket.emit("newimage", png.src, socket.id, name);
    });
    
    var drawingCanvas = document.getElementById('myCanvas');
    drawingCanvas.addEventListener('mousedown', function() {
			console.log('downmouse');
			mouseDown = true;
    });

  	drawingCanvas.addEventListener('mouseup', function() {
			console.log('mouseup');
			mouseDown = false;
			initPalette();
    });

  	// touch events to enable canvas drawing on touchscreens
		drawingCanvas.addEventListener('touchstart', sketchpad_touchStart, false);
		drawingCanvas.addEventListener('touchmove', sketchpad_touchMove, false);
 		drawingCanvas.addEventListener('touchend', sketchpad_touchEnd, false);    

		document.getElementById('pen').addEventListener('click', function(e) {
 			e.preventDefault(); 
 			drawstate = 'line';
 			document.getElementById('map-label').style.display = 'none';
 			document.getElementById('map-label').value = "";
		});
	 	
	 	document.getElementById('text').addEventListener('click', function(e) {
	 		e.preventDefault(); 
	 		drawstate = 'text';
	 		document.getElementById('map-label').style.display = 'block';
		});


	}


function chooseSidebar(showPanel, hidePanel, showDiv, hideDiv) {
	hidePanel.style.display = "none";
	showPanel.style.display = "block";
	hideDiv.style.display = "none";
	showDiv.style.display = "block";
	
}

window.addEventListener('load', init);