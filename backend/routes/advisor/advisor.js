const router = require('express').Router();
const isAdvisor = require("./advisorAuth.js");

//Advisor Homepage
router.get("/",isAdvisor, (req, res, next)=>{
    res.send(req.user);
});

// routes to student for current advisor
router.get('/student',require('./student'));

// routes to advisor chatrooms
router.use('/chatroom',require('./chatroom'));

// routes to advisor course (course in Course Table)
router.user('/course',require('./course'));


module.exports = router; 
