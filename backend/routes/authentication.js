
//check for authorized users only; 
const authMiddleware = (req, res, next) => {
  if (!req.isAuthenticated()) 
    res.redirect('http://onlineadvisor.tk:3000/#/')
  return next();
};

module.exports =  authMiddleware; 
