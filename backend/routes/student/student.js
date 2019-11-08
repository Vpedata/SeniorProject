const router = require('express').Router();
const isStudent = require("./studentAuth.js");
const db = require("../../config/db.js");
const publicRoot = '/home/ubuntu/SeniorProject/frontend/dist'


//Student Homepage
router.get("/",isStudent, (req, res, next)=>{
    res.redirect("http://onlineadvisor.tk:3000/#/fe/student");
    //res.send(req.user[0]);
});

//Get student's id 
router.get("/getmyids",isStudent, (req, res, next)=>{
  res.send("student_ID"+  req.session.student_ID );  
});

//Returns Student's Advisor
router.get("/getmyadvisor",isStudent,(req, res, next)=>{
    
    var sql = "CALL getmyadvisor(?);";
    db.query(sql, [req.session.student_ID], (err, rows, fields) => {
      if (err) throw(err);
      res.json(rows[0]);
    })
});

// routes to student courses
router.use('/courses',require('./courses'));

// routes to student messages
router.use('/messages',require('./messages'));

module.exports = router; 
