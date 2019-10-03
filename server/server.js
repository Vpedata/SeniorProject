var http = require('http');
var connection = require ("./db.js");

http.createServer((req, res)=>{
    console.log("A user made a request" + req.url);
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.write("Here is your response");
    res.end();
}).listen(3000);

console.log("The server is running");