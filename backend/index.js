const express = require('express');
 
// creating an express instance
const app = express()  
const passport = require('passport');
const bodyParser = require('body-parser');
//const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session');
//const session = require('express-session');

//google OAuth2.0 using passport
require('./config/passport.js');

const publicRoot = '/home/ubuntu/SeniorProject/frontend/dist'

app.use(express.static(publicRoot))
//app.use( cookieParser()); 
app.use( bodyParser.json());
app.use( bodyParser.urlencoded({extended: true}));

app.use(cookieSession({
    name: 'session',
    keys: ['proto'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

//app.use(session({
//    secret: 'keyboard cat',
//    resave: false,
//    saveUninitialized: true,
//    cookie: { secure: true } 
//}));

app.use (passport.initialize());
app.use (passport.session());

//Routes to Restful API
const routes = require('./routes.js');

//database connection
var connection = require ("./config/db.js");

app.use(routes);


app.listen(3000, () => {
    console.log("proto  app listening on port 3000")
  });
