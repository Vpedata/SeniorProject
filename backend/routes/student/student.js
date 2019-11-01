const router = require('express').Router();
const isStudent = require("./studentAuth.js");
const publicRoot = '/home/ubuntu/SeniorProject/frontend/dist'


//Student Homepage
router.get("/",isStudent, (req, res, next)=>{
    res.redirect("http://onlineadvisor.tk:3000/#/fe/student");
    //res.send(req.user);
});

//Returns Student Advisor
router.get("/getmyadvisor",isStudent,(req, res, next)=>{
    
});


module.exports = router; 
