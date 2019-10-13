var mysql = require('mysql');
const keys = require('./keys.js');
var connection = mysql.createConnection({
    host:"localhost",
    user: keys.db.uname,
    password:keys.db.pword,
    database: "SeniorProject",
    insecureAuth: true
}).connect(function (err){
    if (err) throw err;
    console.log("Connected to database!");
});


module.exports = connection;

