const router = require('express').Router();
var db = require ("../config/db.js");
const authMiddleware = require("./authentication.js");

//Get all courses
router.get("/all",authMiddleware, (req, res, next)=>{
    var sql = "SELECT * FROM Course";
	  db.query(sql,(err, rows, fields)=>{
    if (err) throw err;
    res.json(rows);
  })
});

//Get an course by id 
router.get("/:id",authMiddleware, (req, res, next) => {
  var sql = "SELECT * FROM Course WHERE course_ID = ?";
  db.query(sql, [req.params.id], (err, rows, fields) => {
    if (err) throw err;
    res.json(rows[0]);
  })
});

//Get an course by crn 
router.get("/:crn",authMiddleware, (req, res, next) => {
  var sql = "SELECT * FROM Course WHERE course_crn = ?";
  db.query(sql, [req.query.crn], (err, rows, fields) => {
    if (err) throw err;
    res.json(rows[0]);
  })
});

module.exports = router; 