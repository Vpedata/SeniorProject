//check if user is student only; 
const isStudent= (req, res, next) => {
    if(req.user.IsStudent)
        return next();
    res.redirect('http://onlineadvisor.tk:3000/#/');
};

module.exports =  isStudent; 

