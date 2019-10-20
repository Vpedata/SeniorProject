const passport = require('passport');
const keys = require('./keys');
var db = require ("./db.js");

// getting the local authentication type
const GoogleStrategy = require('passport-google-oauth20');

// Serialized and deserialized methods when got from session
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
    callbackURL:'/auth/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    passReqToCallback   : true
  }, 
  (accessToken,refreshToken,profile,done) => {

    process.nextTick(function(){
        //google callback
        return done(null, profile);
    });
  }
));
