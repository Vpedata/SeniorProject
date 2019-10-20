const express = require('express');
 
// creating an express instance
const app = express()
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');

const keys = require('./keys');

//Routes to Restful API
const routes = require('./routes.js');

//database connection
var connection = require ("./config/db.js");

//google OAuth2.0 using passport
const passport = require('./config/passport.js');

const publicRoot = '/home/ubuntu/SeniorProject/frontend/dist'

const authMiddleware = (req, res, next) => {
    if (!req.isAuthenticated()) {
      res.status(401).send('You are not authenticated')
    } else {
      return next()
    }
  };
  

app.use(express.static(publicRoot))
app.use(routes);
app.use (bodyParser.json());

app.use(cookieSession({
    name: 'session',
    keys: ['proto'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.use (passport.initialize());
app.use (passport.session());



app.listen(3000, () => {
    console.log("proto  app listening on port 3000")
  });

