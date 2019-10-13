const router = require('express').Router();
var db = require ("./db");
bodyParser = require('body-parser');
router.use(bodyParser.json()); 


router.get("/", (req, res, next) => {
  res.sendFile("index.html", { root: publicRoot })
});


//Get all users
router.get("/users", (req, res, next) =>{
	var sql = "SELECT * FROM User";
	db.query(sql,(err, rows, fields) =>{
    if (!err)
      res.send(rows);
    else
      console.log(err);
  })
});


//Get an user
router.get("/user/:id", (req, res, next) => {
  var sql = "SELECT * FROM User WHERE user_id = ?";
  db.query(sql, [req.params.id], (err, rows, fields) => {
    if (!err)
      res.send(rows);
    else
      console.log(err);
  })
});


//Delete an user
router.delete("/user/:id", (req, res, next) => {
  var sql = "DELETE FROM User WHERE user_id = ?";
  db.query(sql, [req.params.id], (err, rows, fields) => {
      if (!err)
        res.send(rows);
      else
        console.log(err);
  })
});

//Insert an user
router.post("/user", (req, res, next) => {
  let user = req.body.user;
  var sql = "INSERT INTO User SET ? ";
  db.query(sql, { user: user }, (err, rows, fields) => {
    if (!err)
      res.send(rows);
    else
      console.log(err);
  })
});

//Update an user
router.put("/user", (req, res, next) => {
  let user_id = req.body.user_id;
  let user = req.body.user;
  var sql = "UPDATE User SET user = ? WHERE user_id = ?";
  db.query(sql, [user, user_id], (err, rows, fields) => {
      if (!err)
          res.send(rows);
      else
          console.log(err);
  })
});

//Get id by an email
router.put("/user/getmyid/:email",(req, res, next) => {
  var sql = "SELECT user_id FROM User WHERE email = ?";
  db.query(sql, [req.params.email], (err, rows, fields) => {
    if (!err)
      res.send(rows);
    else
      console.log(err);
 })
});

module.exports = router;


