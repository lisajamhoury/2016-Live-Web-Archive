// will need to install following modules:
	// # npm install socket.io
	// # npm install nedb

var http = require('http');
var fs = require('fs');
var sys = require('sys');
var url =  require('url');
var Datastore = require('nedb')
  , db = new Datastore({ filename: 'canvasdata.db', autoload: true });

function requestHandler(req, res) {
	var parsedUrl = url.parse(req.url);
	var path = parsedUrl.pathname;
	if (path == "/") {
		path = "index.html";
	}
	fs.readFile(__dirname + path,
		function (err, fileContents) {
			if (err) {
				res.writeHead(500);
				return res.end('Error loading ' + req.url);
			}
			res.writeHead(200);
			res.end(fileContents);
  		}
  	);	
	// console.log("Got a request " + req.url);
}


var httpServer = http.createServer(requestHandler);
httpServer.listen(3040);


var io = require('socket.io').listen(httpServer);

// use this to flush database
// db.remove({ type: 'mapimage' }, { multi: true }, function (err, numRemoved) {
//   		console.log("err: " + err);
// 			console.log("Removed: " + numRemoved);
// });

// var users = [];

io.sockets.on('connection', 
	function (socket) {

	socket.on('newimage', function (image, id, name) {
		var img = image;
		var imgname = 'map-' + id + '.png';
		// strip off the data: url prefix to get just the base64-encoded bytes
		var data = img.replace(/^data:image\/\w+;base64,/, "");
		var buf = new Buffer(data, 'base64');
		var tstamp = Date.now();
		fs.writeFile('map-images/' + imgname, buf);
		var saveimage = { _id: id, imgname: imgname, type: 'mapimage', mapname: name, timestamp: tstamp };
		db.insert(saveimage, function (err, newImage) {
			console.log("err: " + err);
			// console.log("newDoc: " + newImage);
		});

	});

	

	socket.on('listmaps', function () {
		db.find({ type: 'mapimage' }).sort({ timestamp: 1}).exec(function (err, mapimages) {  
			socket.emit('maplist', mapimages);
		});
	});

	socket.on('viewing', function () {
		db.find({ type: 'mapimage' }).sort({ timestamp: 1}).exec(function (err, mapimages) {  
			socket.emit('updatedmaplist', mapimages);
		});

	});

	}
);