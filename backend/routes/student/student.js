const router = require('express').Router();
const isStudent = require("./studentAuth.js");
const db = require("../../config/db.js");

//Student hompage
router.get("/",isStudent, (req, res, next)=>{
    res.redirect("http://onlineadvisor.tk:3000/#/fe/student");
    //res.send(req.user);
});

//Student Homepage info
router.get("/info",isStudent, (req, res, next)=>{
  res.send(req.user);
});

//Returns Student's Advisor
router.get("/getmyadvisor",isStudent,(req, res, next)=>{
    var sql = "CALL getmyadvisor(?);";
    db.query(sql, [req.user.student_ID], (err, rows, fields) => {
      if (err) throw(err);
      res.json(rows);
    })
});

// routes to student courses
router.use('/courses',require('./courses'));

// routes to student messages
router.use('/messages',require('./messages'));

module.exports = router; 
