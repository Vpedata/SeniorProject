const router = require('express').Router();
const authMiddleware = require("./authentication.js");

//check if user is advisor only; 
const isAdvisor= (req, res, next) => {
    if (!req.user.IsStudent)
        return next();
    res.redirect('/auth/login');
};

//Advisor Homepage
router.get("/",isAdvisor, (req, res, next)=>{
    res.send(req.user);
});

module.exports = router; 
