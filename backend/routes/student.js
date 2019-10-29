const router = require('express').Router();
const authMiddleware = require("./authentication.js");

//check if user is student only; 
const isStudent= (req, res, next) => {
    if (req.user.IsStudent)
        return next();
    res.redirect('/auth/login');
};

//Student Homepage
router.get("/",isStudent, (req, res, next)=>{
    res.redirect("/fe/student")
    //res.send(req.user);
});

module.exports = router; 
