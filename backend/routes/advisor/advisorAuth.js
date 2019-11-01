//check if user is advisor only; 
const isAdvisor= (req, res, next) => {
    if (!req.user.IsStudent)
        return next();
    res.redirect('/auth/login');
};

module.exports = isAdvisor; 
