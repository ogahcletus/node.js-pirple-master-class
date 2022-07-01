/*  7. ROUTING REQUEST:
Next, we have to define some request handlers and set up routing structure so that this http server can look at the request and route it to the right handlers that these requests need to go to.
The process we are going to adopt is simple.
We are going to route requests based on the path the user is asking for.
We will define handlers that are specific to a path.
For examplle iif a user ask for /foo, it should go to the foo handlers, and if they ask for /users, that should go to the users handlers.
So the first thing is to set up a router that can match incoming paths to their respective handlers.
Lastly, we will set up a structure to allow any request that does not match any request from the router to go to a default handler which should the 404 or NOT FOUND handler

This should be after the server listening code



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

    // Choose the handler this vrequest should go to and if one is not found, then use the notfound handler:

    let chosenHandler = typeof(router[trimmedPath]) 
    !== 'undefined'? router[trimmedPath]: handlers.notfound

    //Lets, construct the data object to send to the handler

    let data = {
        'trimmedPath' : trimmedPath,
        'queryStringObject' : queryStringObject,
        'method' : method,
        'headers' : headers,
        'payload' : buffer
    }
    
    //We can now call the chosen handler by routing the request to the handler specified in the router
    chosenHandler(data, function(statusCode, payload){
        /* 1.Use the status code call back by the handler or default to 200
            2. Aslo, use the payload call back by the handler or default to an empty object {}
        */

        statusCode = typeof(statusCode) == 'number'? statusCode : 200

        payload = typeof(payload) == 'object'? payload : {}


        //Convert the payload to string

        let payloadString = JSON.stringify(payload)


        // Finally, to return respond, use writeHead followed by res.end with the hello World parameter replaced by payloadString

        res.writeHead(statusCode);

        res.end(payloadString)


        console.log('Returning this response: ', statusCode,payloadString)


    })


    })

})


//Start the server and have it to listen on port 3000:

server.listen(3000, function(){

    console.log('The server is listening on port 3000')

})


//To Define a Request Router

//first, lets define handlers

 let handlers = {}

 // Define sample handler

 handlers.sample = function(data, callback){
    /*  1. Call back the http status code:
        2. Call back the payload which should be an object

        NB that, although, we have not reinforced json yet, we are already building this API to work with JSON exclusively!
    */

        callback(406,{'name': 'samplehandler'})
}

//Lets also define a NOT FOUND handler
handlers.notfound = function(data, callback){
   //The notfound callback is going to only output the status code 404 and will not give a payload.
   
   callback(404)
}


//Note that it is an object because each path is unique, hence there is no reason not to use an object.

const router = {
    //lets find one path for now

    'sample': handlers.sample
}



