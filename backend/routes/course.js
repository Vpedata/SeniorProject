const router = require('express').Router();
var db = require ("../config/db.js");
const authMiddleware = require("./authentication.js");

//Get all courses
router.get("/all",authMiddleware, (req, res, next)=>{
    var sql = "CALL getAllCourses();";
	  db.query(sql,(err, rows, fields)=>{
    if (err) throw err;
    res.json(rows);
  })
});

//Get all core courses
router.get("/all",authMiddleware, (req, res, next)=>{
  var sql = "CALL getCores();";
  db.query(sql,(err, rows, fields)=>{
  if (err) throw err;
  res.json(rows);
})
});

//Get all noncore courses
router.get("/all",authMiddleware, (req, res, next)=>{
  var sql = "CALL getNonCores();";
  db.query(sql,(err, rows, fields)=>{
  if (err) throw err;
  res.json(rows);
})
});

//Get an course by id 
router.get("/:id",authMiddleware, (req, res, next) => {
  var sql = "CALL getCourseById(?);";
  db.query(sql, [req.params.id], (err, rows, fields) => {
    if (err) throw err;
    res.json(rows);
  })
});

//Get an course by courseCode 
router.get("/number/:cn",authMiddleware, (req, res, next) => {
  var sql = "CALL getCourseByNumber(?);";
  db.query(sql, [req.params.cn], (err, rows, fields) => {
    if (err) throw err;
    res.json(rows);
  })
});

module.exports = router; 