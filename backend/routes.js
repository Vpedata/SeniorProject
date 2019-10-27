const router = require('express').Router();

bodyParser = require('body-parser');
router.use(bodyParser.json()); 

// display the index.html
router.get("/", (req, res, next) => {
  res.sendFile("index.html", { root: publicRoot })
});

// routes to login 
router.use('/auth',require('./routes/auth'));

// routes to user
router.use('/user',require('./routes/user'));

// routes to course
router.use('/course',require('./routes/course'));


module.exports = router;


