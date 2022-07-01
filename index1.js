/*
    1. This is the primary file for the API


*/

// Required Node built-in Modules

const http = require('http');

//The server should respond to all request with a string

const server = http.createServer(function(req, res){

    res.end('Hello World\n')
})

//Start the server and have it to listen on port 3000:

server.listen(3000, function(){

    console.log('The server is listening on port 3000')

})

