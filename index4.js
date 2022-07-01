/*
    4. PARSING THE QUERY STRINGS:
This is to enable us get the query string as an object.
The query string output as an object will enable us to understand what the user is requesting or modify.
It should be done in between the path and the method.


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

// To parse the query string as an object
    const queryStringObject = parseUrl.query


// Get the http method:
    const method = req.method.toLowerCase();


// To send the response
    res.end('Hello World\n')

//To log the path being requested
    console.log('request is received on path: ' + trimmedPath + ' with method ' + method + ' with the query string parameters', queryStringObject)

});

//Start the server and have it to listen on port 3000:

server.listen(3000, function(){

    console.log('The server is listening on port 3000')

})

