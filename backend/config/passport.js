const passport = require('passport');
const keys = require('./keys');
var db = require ("./db.js");

// getting the local authentication type
const GoogleStrategy = require('passport-google-oauth20');

passport.use(new GoogleStrategy({
    callbackURL:'/auth/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    passReqToCallback   : true
  }, 
  (accessToken,refreshToken,profile,done) => {
      //google callback
      var sql = "SELECT * FROM User where google_id= ?";
	  db.query(sql,[profile.id],(err, rows, fields)=>{
        if (err) return done(err);
        if(rows.length)
        {
            done(null, rows[0]);
        }
        else 
        {
            const User = {
                googleId: profile.id,
                username: profile.displayName,
            }
            done (null,User);
        }
    });
}));
