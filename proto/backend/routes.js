const router = require('express').Router();
var db = require ("./db.js");
bodyParser = require('body-parser');
router.use(bodyParser.json()); 

const authRoutes = require('./routes/login')
const userRoutes = require('./routes/user')

// display the index.html
router.get("/", (req, res, next) => {
  res.sendFile("index.html", { root: publicRoot })
});

// routes to login 
router.use('/auth',authRoutes);

// routes to user
router.use('/user',userRoutes);

module.exports = router;


