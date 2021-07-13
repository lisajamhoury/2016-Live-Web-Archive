// HTTP Portion
var util = require('util');
var http = require('http');
var fs = require('fs');
var path = require('path');

var PORT = 8888;

var httpServer = http.createServer(requestHandler);
httpServer.listen(PORT);

// Regular HTTP Portion
function requestHandler(req, res) {

  var pathname = req.url;

  // If blank let's ask for index.html
  if (pathname == '/') {
    pathname = '/index.html';
  }

  // What's our file extension
  var ext = path.extname(pathname);

  // Map extension to file type
  var typeExt = {
    '.html':	'text/html',
    '.js':		'text/javascript',
    '.css':		'text/css',
    '.jpg':		'image/jpeg',
    '.png':		'image/png'
  };
  var contentType = typeExt[ext] || 'text/plain';

  // Now read and write back the file with the appropriate content type
  fs.readFile(__dirname + pathname,
    function (err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading ' + pathname);
      }
      // Dynamically setting content type
      res.writeHead(200,{ 'Content-Type': contentType });
      res.end(data);
    }
  );
}


// WebSocket Portion
// WebSockets work with the HTTP server
var io = require('socket.io').listen(httpServer);

// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection', 
	// We are given a websocket object in our function
	function (socket) {
	
		console.log(Date.now() + " new client: " + socket.id);
				
		socket.on('kinect', function(data) {
			socket.broadcast.emit('kinect', data);
			//console.log(util.inspect(data, {depth: 10}));
		});
	}
);
