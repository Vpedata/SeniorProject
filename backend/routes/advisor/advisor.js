const router = require('express').Router();
const isAdvisor = require("./advisorAuth.js");

//Advisor Homepage
router.get("/",isAdvisor, (req, res, next)=>{
    res.send(req.user);
});

//get all students under current advisor
router.get('/students',isAdvisor,(req,res,next)=> {
    res.send("Under Construnction!!!") ;
});

// routes to advisor chatrooms
router.use('/chatroom',require('./chatroom'));

module.exports = router; 
