
//check for authorized users only; 
const authMiddleware = (req, res, next) => {
  if (!req.user) 
    res.redirect('/auth/login')
  return next();
};

module.exports =  authMiddleware; 