
//check for authorized users only; 
const authMiddleware = (req, res, next) => {
  if (!req.isAuthenticated()) 
    res.redirect('/auth/login')
  return next();
};

module.exports =  authMiddleware; 