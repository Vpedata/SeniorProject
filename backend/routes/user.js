const router = require('express').Router();
var db = require ("../config/db.js");
const authMiddleware = require("./authentication.js");
const authFEMiddleware = require ("./frontendauthentication.js");

// routes to student 
router.use('/student',require('./student/student'));
// routes to advisor
router.use('/advisor',require('./advisor/advisor'));

// redirect to Student or Advisor homepage
router.get("/",authMiddleware, (req, res, next)=>{
    req.session.user_ID = req.user.user_ID;
    console.log(req.session);
    if(!req.user.IsStudent){
      res.redirect('/user/advisor');
    }
    else { 
      res.redirect('/user/student');
    }
});

//Get id of the current user
router.get("/getmyid",authMiddleware,(req, res, next) => {
  res.send('id: ' + req.session.user_ID);                                          
});

//Get all users
router.get("/all",authMiddleware, (req, res, next)=>{
    var sql = "SELECT * FROM User";
	  db.query(sql,(err, rows, fields)=>{
    if (err) throw err;
    res.json(rows);
  })
});

router.get("/check", authFEMiddleware, (req, res, next) => {

    res.send(req.json(redir));

});

//Get an user
router.get("/:id",authMiddleware, (req, res, next) => {
  var sql = "SELECT * FROM User WHERE user_ID = ?";
  db.query(sql, [req.params.id], (err, rows, fields) => {
    if (err) throw(err);
    res.json(rows[0]);
  })
});

//Delete an user
router.delete("/:id", (req, res, next) => {
  var sql = "DELETE FROM User WHERE user_ID = ?";
  db.query(sql, [req.params.id], (err, rows, fields) => {
    if (err) throw err;
    res.json({'status': 'success'});
  })
});

//Insert an user
router.post("/", (req, res, next) => {
  let user = req.body.user;
  var sql = "INSERT INTO User SET ? ";
  db.query(sql, { user: user }, (err, rows, fields) => {
    if (err) throw err;
    res.json({'status': 'success'});
  })
});

//Update an user
router.put("/", (req, res, next) => {
  let user_ID = req.body.user_ID;
  let user = req.body.user;
  var sql = "UPDATE User SET user = ? WHERE user_ID= ?";
  db.query(sql, [user, user_ID], (err, rows, fields) => {
    if (err) throw err; 
    res.json({'status': 'success'});
  })
});

module.exports = router; 
