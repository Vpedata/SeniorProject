const passport = require('passport');
const keys = require('./keys');
var db = require ("./db.js");

// getting the local authentication type
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Serialized and deserialized methods when got from session
passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  var sql = "SELECT * FROM User WHERE user_ID = ?";
  db.query(sql, [id], (err, rows, fields) => {
    if (err)throw err;
    done(null,rows[0]);

  })
});


passport.use(new GoogleStrategy({
    callbackURL:'/auth/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    //passReqToCallback   : true
  }, 
  (accessToken,refreshToken,profile,done) => {
    console.log(profile.emails);
    process.nextTick(function(){
      //google callback
      var sql = "SELECT * FROM User WHERE googleId = ?";
      db.query(sql, [profile.id], (err, rows, fields) => {
        if (err) throw err;
        if(rows.length)
          done(null,rows[0]);
        else 
        {
          let user = {
            isStudent : 1,
            firstName : profile.name.givenName,
            lastName  : profile.name.familyName,
            email     : profile.emails[0].value,
            googleId  : profile.id
          };
          var insert = "INSERT INTO User SET ?;SELECT * FROM User WHERE googleId = ?"
          db.query(insert, [user,profile.id], (err, rows, fields) => {
            if(err) throw  err;
            done(null,rows[0]) 
          });
        }
      });
    });
  }));
