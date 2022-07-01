/*
    3. PARSING THE HTTP METHOD (POST, GET, PUT, DELETE):
This is to enable us figure out which http method the user is requesting when a request comes in.



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

// Get the http method:
    const method = req.method.toLowerCase();


// To send the response
    res.end('Hello World\n')

//To log the path being requested
    console.log('request is received on path: ' + trimmedPath + ' with method ' + method )

});

//Start the server and have it to listen on port 3000:

server.listen(3000, function(){

    console.log('The server is listening on port 3000')

})

