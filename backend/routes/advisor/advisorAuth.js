//check if user is advisor only; 
const isAdvisor= (req, res, next) => {
    if(!req.user.IsStudent)
    {
        return next();
    }
    else 
    {
        res.redirect('http://onlineadvisor.tk:3000/#/');
    }   
};

module.exports = isAdvisor; 
