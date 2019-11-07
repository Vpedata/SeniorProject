const router = require('express').Router();
const isAdvisor = require("./advisorAuth.js");

//get all students for the current advisor 
router.get("/all",isAdvisor, (req, res, next)=> {
    res.send("Under Construction");
});

//get student's list of courses recommended and taken by student email 
router.get("/:email",isAdvisor, (req, res, next)=> {
    res.send("Under Construction");
});

//get student's list of recommended courses by student email
router.get("/:email/recommended",isAdvisor,(req,res,next)=> {
    res.send("Under Construction");
});


module.exports = router; 