const router = require('express').Router();
const isStudent = require("./studentAuth.js");
const db = require("../../config/db.js");

//Return all the messages of the current student; 
router.get("/all",isStudent, (req, res, next)=>{
    res.send("Under construction");
});

//Send a message to student's advisor; 
router.post("/new",isStudent, (req, res, next) => {
    res.send("Under construction");
});

//delete all the messages of the current student
router.delete("/all",isStudent, (req, res, next) => {
    res.send("Under construction");
});

//delete the message with the given message_id;
router.delete("/:id",isStudent,(req, res, next) => {
    res.send("Under construction");
});

module.exports = router; 