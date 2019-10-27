const router = require('express').Router();
const authMiddleware = require("./authentication.js");

//Advisor Homepage
router.get("/",authMiddleware, (req, res, next)=>{
    console.log(req.user);
    res.send(req.user);
});

module.exports = router; 
