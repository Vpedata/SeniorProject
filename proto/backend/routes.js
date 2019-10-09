
const routes = require('./index.js')

app.get("/", (req, res, next) => {
  res.sendFile("index.html", { root: publicRoot })
})


