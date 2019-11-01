const router = require('express').Router();
const isAdvisor = require("./advisorAuth.js");

//Advisor Homepage
router.get("/",isAdvisor, (req, res, next)=>{
    res.send(req.user);
});

module.exports = router; 
