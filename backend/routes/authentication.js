
//check for authorized users only; 
const authMiddleware = (req, res, next) => {
  if (!req.user){ 
    res.redirect('http://onlineadvisor.tk:3000/#/')
  }
  else{
	next();
  }
};


module.exports =  authMiddleware; 
