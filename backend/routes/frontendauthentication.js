const authFEMiddleware = (req, res, next) =>{
    if (!req.user){ 
      var redir = {redirect: "yes"};
      return res.json(redir); 
    }
    else{
      var redir = {redirect: "no"};
      return res.json(redir);
    }
  }

  module.exports = authFEMiddleware;