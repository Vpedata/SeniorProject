const router = require('express').Router();
//const isAdvisor = require("./advisorAuth.js");
const db = require("../../config/db.js");


//Insert a course by courseCode  
router.post("/", (req, res, next) => {
    var sql = "CALL addCourse(?,?,?,?,?)";
    const course = [req.body.courseCode,
                    req.body.name,
                    req.body.isRequired,
                    req.body.recSemester,
                    req.body.creditHours];
    console.log(course);
    console.log(req.body);
    db.query(sql,course, (err, rows, fields) => {
      if (err) throw err;
      res.send(rows);
    });
});
//Update a course by courseCode 
router.put("/", (req, res, next) => {
    var sql = "CALL updateCourse(?,?,?,?,?,?)";
    const course = [req.body.course_ID,
                    req.body.courseCode,
                    req.body.name,
                    req.body.isRequired,
                    req.body.recSemester,
                    req.body.creditHours];
    console.log(course);
    console.log(req.body);
    db.query(sql,course, (err, rows, fields) => {
        if (err) throw err;
        res.send(rows);
    });
});
//Delete a course by courseCode 
router.delete("/:id", (req, res, next) => {
    var sql = " CALL deleteCourse(?)";
    db.query(sql,req.params.id, (err, rows, fields) => {
        if (err) throw err;
        res.send(rows);
    });
});

module.exports = router; 