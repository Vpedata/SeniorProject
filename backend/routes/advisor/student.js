const router = require('express').Router();
const isAdvisor = require("./advisorAuth.js");

//get all students for the current advisor 
router.get("/all",isAdvisor, (req, res, next)=> {
    res.send("Under Construction");
});

//get student's list of courses taken by student email 
router.get("/:email/taken",isAdvisor, (req, res, next)=> {
    res.send("Under Construction");
});

//get student's list of recommended courses by student email
router.get("/:email/recommended",isAdvisor,(req,res,next)=> {
    res.send("Under Construction");
});


module.exports = router; 
