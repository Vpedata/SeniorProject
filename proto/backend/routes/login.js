const router = require('express').Router();

// auth login 
router.get('/login', (req,res)=>{
    res.render('login');
});

// auth logout
router.get('/login', (req,res)=>{
    res.render('logout');
});

module exports = router; 