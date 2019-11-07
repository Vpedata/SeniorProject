const router = require('express').Router();
const isStudent = require("./studentAuth.js");
const db = require("../../config/db.js");
const publicRoot = '/home/ubuntu/SeniorProject/frontend/dist'


//Student Homepage
router.get("/",isStudent, (req, res, next)=>{

    var sql = "CALL getStudentByEmail(?,@student); select @student;";
    db.query(sql, [req.user[0].email], (err, rows, fields) => {
      if (err) throw(err);
      req.session.student_ID = rows[0];
      console.log(req.session);
    });
    res.redirect("http://onlineadvisor.tk:3000/#/fe/student");
    //res.send(req.user[0]);
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
