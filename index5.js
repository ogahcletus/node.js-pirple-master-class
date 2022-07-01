/*  5. PARSING REQUEST HEADERS:
This is to enale us get the headers that the users might have sent to the server.
This should be done in between the http method and getting the response.

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

//To Get The Headers as an Object:
    const headers = req.headers;


// To send the response
    res.end('Hello World\n')

//To log the path being requested
   /* console.log('request is received on path: ' + trimmedPath + ' with method ' + method + ' with the query string parameters', queryStringObject) 

   We have to comment it out because we already know that its working
   However, we vverify output here using postman and not terminal

    */

    console.log('Request received with these headers:', headers)


});

//Start the server and have it to listen on port 3000:

server.listen(3000, function(){

    console.log('The server is listening on port 3000')

})

