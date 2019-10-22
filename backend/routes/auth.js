const router = require('express').Router();
const passport = require('passport');

// auth login page
router.get('/login',passport.authenticate('google',{
    accessType: 'offline',
    prompt: 'consent',
    scope: ['profile','email']
}));

//callback route for google to redirect to
router.get('/redirect',passport.authenticate('google',(req, res)=>{
    res.send(req.user);
}));
    

// auth logout
router.get('/logout', (req,res)=>{
    req.logout();
    res.redirect('/');
});



module.exports = router; 