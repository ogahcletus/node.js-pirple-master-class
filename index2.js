/*
    2. PARSING REQUEST PATHS:
The next thing to do from just something that listens on a port that says hello world into an API is to start figuring out which resources people are requesting when they send a request to the API.
And in oder to do this, we need to parse the url they are asking for

*/

// Required Node built-in Modules

const http = require('http');
const url = require('url');

//The server should respond to all request with a string

const server = http.createServer(function(req, res){

//Get the url and parse it
    const parseUrl = url.parse(req.url, true);

//Get the path from that url
    const path = parseUrl.pathname;
    const trimmedPath = path.replace(/\/+|\/$/g, '');


// To send the response
    res.end('Hello World\n')

//To log the path being requested
    console.log('request is received on path: ' *trimmedPath)

});

//Start the server and have it to listen on port 3000:

server.listen(3000, function(){

    console.log('The server is listening on port 3000')

})

