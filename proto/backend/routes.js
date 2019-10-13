const router = require('express').Router();
var db = require ("./db.js");
bodyParser = require('body-parser');
router.use(bodyParser.json()); 
router.use(bodyParser.urlencoded({
  extended: true
}));

router.get("/", (req, res, next) => {
  res.sendFile("index.html", { root: publicRoot })
});


//Get all users
router.get("/users", function(req, res, next){
  db.connection.connect(function(err) {
    if (err) throw err;
    var sql = "SELECT * FROM User";
	  db.query(sql,function(err, rows, fields){
    if (err) throw err;
    res.json(rows);
    })
  });
});


//Get an user
router.get("/user/:id", (req, res, next) => {
  var sql = "SELECT * FROM User WHERE user_ID = ?";
  db.query(sql, [req.params.id], (err, rows, fields) => {
    if (err)
      console.log(err);
    else
      res.json(rows[0]);
  })
});


//Delete an user
router.delete("/user/:id", (req, res, next) => {
  var sql = "DELETE FROM User WHERE user_ID = ?";
  db.query(sql, [req.params.id], (err, rows, fields) => {
    if (err)
      console.log(err);
    else
      res.json({'status': 'success'});
  })
});

//Insert an user
router.post("/user", (req, res, next) => {
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
router.put("/user", (req, res, next) => {
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

//Get id by an email
router.put("/user/getmyid/:email",(req, res, next) => {
  var sql = "SELECT user_ID FROM User WHERE email = ?";
  db.query(sql, [req.params.email], (err, rows, fields) => {
    if (err)
      console.log(err);
    else
      res.senjsond(rows);
 })
});

module.exports = router;


