const passport = require('passport');

// getting the local authentication type
const GoogleStrategy = require('passport-google-oauth20');

passport.use(
  new GoogleStrategy({
    callbackURL:'/auth/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
  }, (accessToken,refreshToken,profile,done) => {
      //google callback
      console.log('passport callback function ready')
  } 
  ));