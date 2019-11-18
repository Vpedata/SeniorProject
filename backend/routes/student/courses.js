const router = require('express').Router();
const isStudent = require("./studentAuth.js");
const db = require("../../config/db.js");


//Get all the courses taken by the current student 
router.get("/taken",isStudent, (req, res, next) => {
    var sql = "CALL getTakenCourses(?)";
    db.query(sql,req.user.student_ID, (err, rows, fields) => {
      if (err) throw err;
      res.send(rows);
    });
});

//Get recommended courses for current student;
router.get("/recommended",isStudent, (req, res, next) => {
    var sql = "CALL getReccomendedSemester(?);";
    db.query(sql,req.user.student_ID, (err, rows, fields) => {
      if (err) throw err;
      res.json(rows);
    });
});

//Get courses that are left to take for current students; 
router.get("/yetToTake",isStudent, (req, res, next) => {
    var sql = "CALL classesYetToTake(?);";
    db.query(sql,req.user.student_ID, (err, rows, fields) => {
      if (err) throw err;
      res.json(rows);
    });
});

//update the list of couses taken by the current student
router.post("/taken",isStudent,(req, res, next) => {
    var sql = "CALL addTakenClasses(?,?,?);";
    console.log(req.body.classes);
    const classInfo = [req.body.classes,req.user.student_ID,req.body.grades];
    db.query(sql,classInfo, (err, rows, fields) => {
        if (err) throw err;
        res.send(rows);
    });
});

router.get("/deleteNegOnes", isStudent, (req, res, next)=>{
    var sql = "CALL removeNegOnes(?);";
    db.query(sql, req.user.student_ID, (err, rows, fields) => {
      if (err) throw err;
      res.send(rows);
    });
});

router.get("/getUserRecommend", isStudent, (req, res, next)=>{
  var sql = "CALL callAllNegOnesForStudent(?);";
  db.query(sql,req.user.student_ID, (err, rows, fields) => {
    if (err) throw err;
    res.json(rows);
  });
});

module.exports = router; 