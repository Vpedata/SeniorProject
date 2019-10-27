const router = require('express').Router();
const authMiddleware = require("./authentication.js");

//Student Homepage
router.get("/",authMiddleware, (req, res, next)=>{
    console.log(req.user);
    res.send(req.user);
});

module.exports = router; 
