const router = require('express').Router();
const isAdvisor = require("./advisorAuth.js");
const db = require("../../config/db.js");

//Advisor Homepage
router.get("/",isAdvisor, (req, res, next)=>{
    var sql = "CALL getAdvisorByEmail(?,@advisor); select @advisor as advisor_ID;";
    db.query(sql, [req.user[0].email], (err, rows, fields) => {
      if (err) throw(err);
      req.session.student_ID = rows[1][0].advisor_ID;
    })
    res.send(req.user[0]);
});

// routes to student for current advisor
router.use('/student',require('./student'));

// routes to advisor chatrooms
router.use('/chatroom',require('./chatroom'));

// routes to advisor course (course in Course Table)
router.use('/course',require('./course'));


module.exports = router; 
