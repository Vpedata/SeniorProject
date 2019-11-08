const router = require('express').Router();
const isAdvisor = require("./advisorAuth.js");
const db = require("../../config/db.js");

//Advisor Homepage
router.get("/",isAdvisor, (req, res, next)=>{
    req.session.user = req.user[0];
    console.log(req.session.user);
    res.send(req.user[0]);
});

//Get student's id 
router.get("/getmyids",isAdvisor, (req, res, next)=>{
    res.send({"user_Id": req.session.user_ID, "advisor_ID": req.session.advisor_ID });  
  });

// routes to student for current advisor
router.use('/student',require('./student'));

// routes to advisor chatrooms
router.use('/chatroom',require('./chatroom'));

// routes to advisor course (course in Course Table)
router.use('/course',require('./course'));


module.exports = router; 
