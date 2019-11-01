const router = require('express').Router();
const isStudent = require("./studentAuth.js");
const publicRoot = '/home/ubuntu/SeniorProject/frontend/dist'


//Student Homepage
router.get("/",isStudent, (req, res, next)=>{
    res.redirect("http://onlineadvisor.tk:3000/#/fe/student");
    //res.send(req.user);
});

//Returns Student's Advisor
router.get("/getmyadvisor",isStudent,(req, res, next)=>{
   res.send("Advisor in progress!!!") ;
});

// routes to student courses
router.use('/courses',require('./courses'));

// routes to student messages
router.use('/messages',require('./messages'));

module.exports = router; 
