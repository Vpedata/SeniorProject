const router = require('express').Router();

router.get("/", (req, res, next) => {
  res.sendFile("index.html", { root: publicRoot })
});

module.exports = router;


