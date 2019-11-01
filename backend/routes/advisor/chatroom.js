const router = require('express').Router();
const isAdvisor = require("./advisorAuth.js");
const db = require("../../config/db.js");

//Return all the chats of all students for the current advisor; 
router.get("/all",isAdvisor, (req, res, next)=>{
    res.send("Under construction");
});

//Return info about the chatroom of a student by given student_ID; 
router.get("/:id",isAdvisor, (req, res, next) => {
    res.send("Under construction");
});

//delete the chat with the given student_id;
router.delete("/:id",isAdvisor,(req, res, next) => {
    res.send("Under construction");
});

//adds a new chatroom with the given student_ID;
router.post("/:id",isAdvisor,(req, res, next) => {
    res.send("Under construction");
});

// routes to advisor chatrooms
router.use('/messages',require('./messages'));


module.exports = router; 