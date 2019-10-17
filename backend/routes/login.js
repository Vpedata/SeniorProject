const router = require('express').Router();
const passport = require('passport');


// auth page
router.get('/',passport.authenticate('google',{
    scope:['profile']
}));

//callback route for google to redirect to
router.get('/redirect',passport.authenticate('google'),(req,res)=>{
    res.send("You reached the callback URI")
})

// auth login 
router.get('/login', (req,res)=>{
    res.send('login');
});

// auth logout
router.get('/logout', (req,res)=>{
    res.send('logout');
});



module.exports = router; 