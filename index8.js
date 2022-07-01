/*  8. Adding HTTPS SUPPORT:
To add HTTPS support to our App , we need to create a SSL Certificate that we can use within the App to actually facilitate 
the SSL handshake etc
In order to use the SSL, we will use an open SSL
Set up a HTTP folder for the two certificates key.pem and Cert.pem
Set up yhe Config file and export for equirements in our index (server )js file
Instead of creating a new code for the https server, we will refactor the codes for the http server so that it can meet the coding logic needs for both the http and https server.


*/

// Required Node built-in Modules

const http = require('http');
const https = require('https')
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const config = require('./config')
const fs = require('fs')

//INSTANTIATE THE HTTP SERVER:

const httpServer = http.createServer(function(req, res){
    unifiedServer(req, res);
})

// Start the HTTP server
httpServer.listen(config.httpPort,function(){
    console.log('The HTTP server is running on port '+config.httpPort);
})

// Instantiate the HTTPS server
var httpsServerOptions = {
    'key': fs.readFileSync('./https/key.pem'),
    'cert': fs.readFileSync('./https/cert.pem')
  };
  var httpsServer = https.createServer(httpsServerOptions,function(req,res){
    unifiedServer(req,res);
  });
  
  // Start the HTTPS server
  httpsServer.listen(config.httpsPort,function(){
   console.log('The HTTPS server is running on port '+config.httpsPort);
  });


//Create the Unified Server for HTTP and HTTPS logic

const unifiedServer = function(req, res){

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

}


// Define sample handler

let handlers = {};

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

