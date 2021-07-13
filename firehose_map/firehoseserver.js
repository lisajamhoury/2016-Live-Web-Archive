// HTTP Portion
var http = require('http');
var fs = require('fs'); // Using the filesystem module
var Twitter = require('twitter');

var httpServer = http.createServer(requestHandler);
httpServer.listen(8001);

var io = require('socket.io').listen(httpServer);

var twitter = new Twitter({
	consumer_key: 'wi4lJxEAe6FxH30dduUmXhMu9',
  	consumer_secret: '8r2Qh2pQ9LYjb5DnWgsh6lEK9DQmrAhltVSt3syHQ8OjRVjcmN',
  	access_token_key: '41456179-I6pCSu0C37H4B5p3ZXzWQjc1kWooeuevJoCFYuhMa',
  	access_token_secret: 'Q5kwdJUhacH5Y40ooeUCQovhj64dIarFF4D9UH25f4hz2'
});

function requestHandler(req, res) {
	// Read index.html
	fs.readFile(__dirname + req.url, 
		// Callback function for reading
		function (err, data) {
			// if there is an error
			if (err) {
				res.writeHead(500);
				return res.end('Error loading page');
			}
			// Otherwise, send the data, the contents of the file
			res.writeHead(200);
			res.end(data);
  		}
  	);
}


var stream = null;
var counter = 0;
// var params = {track: 'bowie'};
var params = {'locations':'-180,-90,180,90'};



io.sockets.on('connection', function (socket) {
		
	// console.log("We have a new client: " + socket.id);

	if (stream == null) {
		socket.on("start-tweets", function() {
			twitter.stream('statuses/filter', params, function(s){
				stream = s;
		    	stream.on('data', function(tweet) {
		        	// If tweet has coordinates
		        	if (tweet.coordinates && tweet.coordinates !== null) {
			            var outputPoint = {"text": tweet.text,"lat": tweet.coordinates.coordinates[0],"lng": tweet.coordinates.coordinates[1]};

			            // console.log(outputPoint);
			            socket.broadcast.emit("twitter-stream", outputPoint);
			            socket.emit("twitter-stream", outputPoint);
			  
		  		  	} else {
			    		counter += 1;    		
			    		// console.log(counter);
		    		}
		    	});
			});
		});
	}

	//Emits signal to the client that they are connected 
	socket.emit("connected");
	
	socket.on('disconnect', function() {
		// console.log("Client has disconnected " + socket.id);
	});
});










