const router = require('express').Router();
const isStudent = require("./studentAuth.js");
const db = require("../../config/db.js");


//Get recommended courses for current student; 
router.get("/taken",isStudent, (req, res, next) => {
    var sql = "CALL getTakenCourses(?)";
    db.query(sql,req.user.student_ID, (err, rows, fields) => {
      if (err) throw err;
      res.send(rows);
    });
});

//Get all the courses taken by the current student
router.get("/recommended",isStudent, (req, res, next) => {
    res.send("Under construction");
});

//update the list of couses taken by the current student
router.post("/taken",isStudent,(req, res, next) => {
    res.send("Under construction");
});

//update the list of courses recommended for current student
router.post("/recommended",isStudent,(req, res, next) => {
    res.send("Under construction");
});

module.exports = router; 