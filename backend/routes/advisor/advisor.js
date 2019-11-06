const router = require('express').Router();
const isAdvisor = require("./advisorAuth.js");

//Advisor Homepage
router.get("/",isAdvisor, (req, res, next)=>{
    res.send(req.user[0]);
});

// routes to student for current advisor
router.use('/student',require('./student'));

// routes to advisor chatrooms
router.use('/chatroom',require('./chatroom'));

// routes to advisor course (course in Course Table)
router.use('/course',require('./course'));


module.exports = router; 
