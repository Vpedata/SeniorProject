const router = require('express').Router();

router.get("/", (req, res, next) => {
  res.sendFile("index.html", { root: publicRoot })
});

var mysqlConnection = require ("./db.js");

//Get all users
router.get('/users', (req, res) => {
  mysqlConnection.query("SELECT * FROM User", 
    (err, rows, fields) => {
      if (!err)
        res.send(rows);
      else
        console.log(err);
  })
});

//Get an user
router.get('/user/:id', (req, res) => {
  mysqlConnection.query('SELECT * FROM User WHERE user_id = ?', 
  [req.params.id], (err, rows, fields) => {
      if (!err)
        res.send(rows);
      else
        console.log(err);
  })
});


//Delete an user
router.delete('/user/:id', (req, res) => {
  mysqlConnection.query('DELETE FROM User WHERE user_id = ?', [req.params.id], (err, rows, fields) => {
      if (!err)
        res.send(rows);
      else
        console.log(err);
  })
});

//Insert an user
router.post('/user', (req, res) => {
  let user = req.body.user;
  mysqlConnection.query('INSERT INTO User SET ? ', { user: user }, (err, rows, fields) => {
      if (!err)
        res.send(rows);
      else
        console.log(err);
  })
});

//Update an user
router.put('/user', (req, res) => {
  let user_id = req.body.user_id;
  let user = req.body.user;
  mysqlConnection.query()
  mysqlConnection.query('UPDATE User SET user = ? WHERE user_id = ?', [user, user_id], (err, rows, fields) => {
      if (!err)
          res.send(rows);
      else
          console.log(err);
  })
});

//Get id by an email
router.put('/user/getmyid/:email',(req, res) => {
  mysqlConnection.query('SELECT user_id FROM User WHERE email = ?', [req.params.email], (err, rows, fields) => {
    if (!err)
      res.send(rows);
    else
      console.log(err);
 })
});

module.exports = router;


