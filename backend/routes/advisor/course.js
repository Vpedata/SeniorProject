const router = require('express').Router();
const isAdvisor = require("./advisorAuth.js");
const db = require("../../config/db.js");


//Insert a course by courseCode  
router.post("/:cn",isAdvisor, (req, res, next) => {
    res.send("Under Construction");
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