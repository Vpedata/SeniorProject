var mysql = require('mysql');
const keys = require('./keys.js');

var connection = mysql.createConnection({
    host:"3.84.68.239",
    user: keys.db.uname,
    password:keys.db.pword,
    database: "SeniorProject",
    insecureAuth: true
})
connection.connect(function (err){
    if (err) throw err;
    console.log("Connected to database!");
});


module.exports = connection;
