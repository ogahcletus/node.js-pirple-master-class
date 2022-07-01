/*  6. PARSING PAYLOADS:
The next thing we want to do before handling the request the user send to the server and routiing them somewhere is to get the payloads that the user sent.
It should be between the header and the response.
We are going to need another built in module called the string decoder and require it.


*/

// Required Node built-in Modules

const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

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


//To get the payload, if any:
// First, create a new stringdecoder to decode the bit strings streaming into the server
    const decoder = new StringDecoder(
        'utf-8')

//secondly, create a new string to hold the utf8 bt strings decoded and initialise first into an empty string:
    let buffer = '';

//Then append the existing string to the event( called data) that that the request object emits:
    req.on('data', function(data){
        buffer += decoder.write(data)
    
    })

    // Crete another event function() end, which will not taked any parameters to confirm the completion of the previous data event
    req.on('end', function(){
        buffer += decoder.end();

    //Now move the reponse and request codes into the handler of the end eevent

    res.end('Hello World\n')

    console.log('Request received with this payload: ', buffer)

    })

})


//Start the server and have it to listen on port 3000:

server.listen(3000, function(){

    console.log('The server is listening on port 3000')

})

//use postman with post request to add body

