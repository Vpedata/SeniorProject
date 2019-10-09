const express = require('express')
 
// creating an express instance
const app = express()
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
const passport = require('passport')

//database connection
var connection = require ("./db.js");

// getting the local authentication type
const LocalStrategy = require('passport-oauth').Strategy

//THIS HAS TO CHANGE
const publicRoot = '/home/ubuntu/SeniorProject/proto/dist'

const authMiddleware = (req, res, next) => {
    if (!req.isAuthenticated()) {
      res.status(401).send('You are not authenticated')
    } else {
      return next()
    }
  }
  

app.use(express.static(publicRoot))

app.use (bodyParser.json())

app.use(cookieSession({
    name: 'session',
    keys: ['proto'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.use (passport.initialize())
app.use (passport.session())



app.listen(3000, () => {
    console.log("proto  app listening on port 3000")
  })

