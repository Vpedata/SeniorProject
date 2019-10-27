const router = require('express').Router();
var db = require ("../config/db.js");

//check for authorized users only; 
const authMiddleware = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.redirect('/auth/login');
  } else {
    return next()
  }
};

//User Homepage
router.get("/",authMiddleware, (req, res, next)=>{
    res.session.userId = req.user.user_ID; 
    res.send(req.user);
});


//Get all users
router.get("/all",authMiddleware, (req, res, next)=>{
    var sql = "SELECT * FROM User";
	  db.query(sql,(err, rows, fields)=>{
    if (err) throw err;
    res.json(rows);
  })
});



//Get an user
router.get("/:id",authMiddleware, (req, res, next) => {
  var sql = "SELECT * FROM User WHERE user_ID = ?";
  db.query(sql, [req.params.id], (err, rows, fields) => {
    if (err)
      console.log(err);
    else
      res.json(rows[0]);
  })
});


//Delete an user
router.delete("/:id", (req, res, next) => {
  var sql = "DELETE FROM User WHERE user_ID = ?";
  db.query(sql, [req.params.id], (err, rows, fields) => {
    if (err)
      console.log(err);
    else
      res.json({'status': 'success'});
  })
});

//Insert an user
router.post("/", (req, res, next) => {
  let user = req.body.user;
  var sql = "INSERT INTO User SET ? ";
  db.query(sql, { user: user }, (err, rows, fields) => {
    if (err)
      console.log(err);
    else
      res.json({'status': 'success'});
  })
});

//Update an user
router.put("/", (req, res, next) => {
  let user_ID = req.body.user_ID;
  let user = req.body.user;
  var sql = "UPDATE User SET user = ? WHERE user_ID= ?";
  db.query(sql, [user, user_ID], (err, rows, fields) => {
    if (err)
      console.log(err);
    else
      res.json({'status': 'success'});
  })
});

//Get id of the current user 
router.put("/getmyid",(req, res, next) => {
    res.send('id: ' + req.session.userId);
});

module.exports = router; 