const router = require('express').Router();

// auth login 
router.get('/login', (req,res)=>{
    res.send('login');
});

// auth logout
router.get('/logout', (req,res)=>{
    res.send('logout');
});

module.exports = router; 