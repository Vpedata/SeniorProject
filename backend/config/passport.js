const passport = require('passport');
const keys = require('./keys');
var db = require ("./db.js");

// getting the local authentication type
const GoogleStrategy = require('passport-google-oauth20');

passport.use(
  new GoogleStrategy({
    callbackURL:'/auth/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    passReqToCallback   : true
  }, (accessToken,refreshToken,profile,done) => {
      //google callback
      let google_id = profile.id;
      var sql = "SELECT * FROM User where google_id= ?";
	  db.query(sql,[google_id],(err, rows, fields)=>{
        if (err) throw err;
        if(!rows.length){
            //new user
        }
        else {
            //existing user
        }
        
  }));