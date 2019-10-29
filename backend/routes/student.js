const router = require('express').Router();
const authMiddleware = require("./authentication.js");
const publicRoot = '/home/ubuntu/SeniorProject/frontend/dist'

//check if user is student only; 
const isStudent= (req, res, next) => {
    if (req.user.IsStudent)
        return next();
    res.redirect('/auth/login');
};

//Student Homepage
router.get("/",isStudent, (req, res, next)=>{
    res.redirect("http://onlineadvisor.tk:3000/#/fe/student");
    //res.send(req.user);
});

module.exports = router; 
