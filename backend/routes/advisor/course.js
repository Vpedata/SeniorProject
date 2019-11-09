const router = require('express').Router();
const isAdvisor = require("./advisorAuth.js");
const db = require("../../config/db.js");


//Insert a course by courseCode  
router.post("/",isAdvisor, (req, res, next) => {
    var sql = "#CALL addCourse(?,?,?,?,?)";
    const course = [req.body.courseCode,
                    req.body.name,
                    req.body.recSemester,
                    req.body.isRequired,
                    req.body.creditHours]
    db.query(sql,course, (err, rows, fields) => {
      if (err) throw err;
      res.send(rows);
    });
});
//Update a course by courseCode 
router.put("/:cn",isAdvisor, (req, res, next) => {
    res.send("Under Construction");
});
//Delete a course by courseCode 
router.delete("/:cn",isAdvisor, (req, res, next) => {
    res.send("Under Construction");
});

module.exports = router; 