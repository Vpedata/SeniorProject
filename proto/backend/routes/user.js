const router = require('express').Router();


//Get all users
router.get("/user/all", (req, res, next)=>{
    var sql = "SELECT * FROM User";
	  db.query(sql,(err, rows, fields)=>{
    if (err) throw err;
    res.json(rows);
  })
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

//Get id of the current user 
router.put("/user/getmyid",(req, res, next) => {
    res.send('id: ' + req.query.id);
});

module.exports = router; 