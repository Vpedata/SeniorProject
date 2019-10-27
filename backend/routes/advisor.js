const router = require('express').Router();
const authMiddleware = require("./authentication.js");

//Student Homepage
router.get("/",authMiddleware, (req, res, next)=>{
    res.send(req.user);
});

module.exports = router; 
