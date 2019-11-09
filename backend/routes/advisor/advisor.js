const router = require('express').Router();
const isAdvisor = require("./advisorAuth.js");
const db = require("../../config/db.js");

//Advisor Homepage
router.get("/",isAdvisor, (req, res, next)=>{
    res.send(req.user);
});

//Adivsor Homepage info
router.get("/info",isAdvisor, (req, res, next)=>{
    res.send(req.user);
});
  

// routes to student for current advisor
router.use('/student',require('./student'));

// routes to advisor chatrooms
router.use('/chatroom',require('./chatroom'));

// routes to advisor course (course in Course Table)
router.use('/course',require('./course'));


module.exports = router; 
