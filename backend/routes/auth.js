const router = require('express').Router();
const passport = require('passport');
const authMiddleware = require("./authentication.js");

// auth login page
router.get('/login',passport.authenticate('google',{
    accessType: 'offline',
    prompt: 'consent',
    scope: ['profile','email']
}));

//callback route for google to redirect to
router.get('/redirect',passport.authenticate('google',{
    successRedirect: '/user',
    failureRedirect: '/auth/login'
}));
    
// auth logout
router.get('/logout',authMiddleware, (req,res)=>{
    req.session.destroy();
    req.logout();
    res.redirect('http://onlineadvisor.tk:3000/#/');
});


module.exports = router; 