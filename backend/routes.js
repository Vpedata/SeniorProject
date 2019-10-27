const router = require('express').Router();

bodyParser = require('body-parser');
router.use(bodyParser.json()); 

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const courseRoutes = require('./routes/course');

// display the index.html
router.get("/", (req, res, next) => {
  res.sendFile("index.html", { root: publicRoot })
});

// routes to login 
router.use('/auth',authRoutes);

// routes to user
router.use('/user',userRoutes);

// routes to course
router.use('/course',courseRoutes);

module.exports = router;


