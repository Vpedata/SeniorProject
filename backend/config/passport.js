const passport = require('passport');
const keys = require('./keys');

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
      //User.findOrCreate({ googleId: profile.id }, function (err, user) {
       // return done(err, user);
      //});
  }));