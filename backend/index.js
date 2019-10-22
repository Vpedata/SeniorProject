const express = require('express');
 
// creating an express instance
const app = express()

const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');

//google OAuth2.0 using passport
require('./config/passport.js');


app.use(cookieSession({
    name: 'session',
    keys: ['proto'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true } 
}));

app.use (passport.initialize());
app.use (passport.session());

//Routes to Restful API
const routes = require('./routes.js');

//database connection
var connection = require ("./config/db.js");

const publicRoot = '/home/ubuntu/SeniorProject/frontend/dist'

app.use(express.static(publicRoot))
app.use(routes);
app.use(bodyParser.urlencoded({ extended: false }));
app.use (bodyParser.json());

app.listen(3000, () => {
    console.log("proto  app listening on port 3000")
  });
