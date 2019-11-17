const router = require('express').Router();
const isAdvisor = require("./advisorAuth.js");
const db = require("../../config/db.js");

//get all students for the current advisor 
router.get("/all",isAdvisor, (req, res, next)=> {
    var sql = "CALL getAllStudents(?);";
    db.query(sql,req.user.advisor_ID, (err, rows, fields) => {
        if (err) throw err;
        res.send(rows);
    });
});

//get student_ID by email 
router.get("/id/:email",isAdvisor, (req, res, next)=> {
var sql = "CALL getStudentByEmail(?,@student); select @student as student_ID;";
    db.query(sql,req.params.email, (err, rows, fields) => {
        if (err) throw err;
        res.send(rows);
    });
});

//get student's list of courses taken by student email 
router.get("/:id/taken",isAdvisor, (req, res, next)=> {
    var sql = "CALL getTakenCourses(?);";
    db.query(sql,req.params.id, (err, rows, fields) => {
        if (err) throw err;
        res.send(rows);
    });
});

//Get courses that are left to take for current students; 
router.get("/:email/yetToTake",isAdvisor, (req, res, next) => {
    var sql = "CALL getStudentClassesYetToTake(?); ";
    db.query(sql,req.params.email, (err, rows, fields) => {
      if (err) throw err;
      res.send(rows);
    });
});

//get student's list of recommended courses by student email
router.get("/:id/recommended",isAdvisor,(req,res,next)=> {
    var sql = "CALL getReccomendedSemester(?);";
    db.query(sql,req.params.id, (err, rows, fields) => {
        if (err) throw err;
        res.send(rows);
    });
});


module.exports = router; 
