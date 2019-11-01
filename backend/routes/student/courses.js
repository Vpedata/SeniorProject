const router = require('express').Router();
const isStudent = require("./studentAuth.js");
const db = require("../../config/db.js");

//Get courses for current student recommended and taken
router.get("/all",isStudent, (req, res, next)=>{
    res.send("Under construction");
});

//Get recommended courses for current student; 
router.get("/taken",isStudent, (req, res, next) => {
    res.send("Under construction");
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