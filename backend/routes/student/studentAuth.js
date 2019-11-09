//check if user is student only; 
const isStudent= (req, res, next) => {
    if(req.user.IsStudent)
    {
        return next();
    }
    else 
    {
        res.redirect('http://onlineadvisor.tk:3000/#/');
    }     
};

module.exports =  isStudent; 

