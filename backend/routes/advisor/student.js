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


//get current semester for a student by student_ID 
router.get("/curSem/:id/",isAdvisor, (req, res, next)=> {
var sql = "CALL getStudentCurrentSem(?)";
    db.query(sql,req.params.id, (err, rows, fields) => {
        if (err) throw err;
        res.send(rows);
    });
});

//get student's list of courses taken by student id 
router.get("/:id/taken",isAdvisor, (req, res, next)=> {
    var sql = "CALL getTakenCourses(?);";
    db.query(sql,req.params.id, (err, rows, fields) => {
        if (err) throw err;
        res.send(rows);
    });
});

//get student credits taken by student id 
router.get("/takenCredits/:id",isAdvisor, (req, res, next)=> {
    var sql = "CALL getTakenCoursesCredits(?);";
    db.query(sql,req.params.id, (err, rows, fields) => {
        if (err) throw err;
        res.send(rows);
    });
});


//Get courses that are left to take for current students; 
router.get("/:id/yetToTake",isAdvisor, (req, res, next) => {
    var sql = "CALL classesYetToTake(?);";
    db.query(sql,req.params.id, (err, rows, fields) => {
      if (err) throw err;
      res.send(rows);
    });
});

//get student's list of recommended courses by student id
router.get("/:id/recommended",isAdvisor,(req,res,next)=> {
    var sql = "CALL getReccomendedSemester(?);";
    db.query(sql,req.params.id, (err, rows, fields) => {
        if (err) throw err;
        res.send(rows);
    });
});

//get student's select recommeded courses by student_id
router.get("/:id/studentRecommended", isAdvisor, (req, res, next)=>{
    var sql = "CALL callAllNegOnesForStudent(?);";
    db.query(sql,req.params.id, (err, rows, fields) => {
      if (err) throw err;
      res.json(rows);
    });
});


module.exports = router; 
