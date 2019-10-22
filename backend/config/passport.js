const passport = require('passport');
const keys = require('./keys');
var db = require ("./db.js");

// getting the local authentication type
const GoogleStrategy = require('passport-google-oauth20');

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
    passReqToCallback   : true
  }, 
  (accessToken,refreshToken,profile,done) => {
    console.log(done);
    process.nextTick(function(){
      //google callback
      var sql = "SELECT * FROM User WHERE googleId = ?";
      db.query(sql, [done.id], (err, rows, fields) => {
        if (err) throw err;
        if(rows.length)
          done(null,rows[0]);
        else 
        {
          let user = [1,done.name.givenName,done.name.familyName, done.emails[0].value, done.id]
          var insert = "INSERT INTO students (isStudent,firstName,lastName,email,googleId) VALUES ?; SELECT SCOPE_IDENTITY();"
          db.query(insert, [user], (err, rows, fields) => {
            if(err) throw  err;
            done(null,rows[0]) 
          });
        }
      });
    });
  }));
