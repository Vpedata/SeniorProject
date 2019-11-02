const router = require('express').Router();
const isAdvisor = require("./advisorAuth.js");
const db = require("../../config/db.js");


//Insert a course by crn  
router.post("/:crn",isAdvisor, (req, res, next) => {
    res.send("Under Construction");
});
//Update a course by crn 
router.put("/:crn",isAdvisor, (req, res, next) => {
    res.send("Under Construction");
});
//Delete a course by crn 
router.delete("/:crn",isAdvisor, (req, res, next) => {
    res.send("Under Construction");
});

module.exports = router; 