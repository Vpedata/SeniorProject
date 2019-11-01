const router = require('express').Router();
const isAdvisor = require("./advisorAuth.js");
const db = require("../../config/db.js");

//Return all the messages of the given student by student_ID for current advisor; 
router.get("/all",isAdvisor, (req, res, next)=>{
    res.send("Under construction");
});

//Send a message to student from a current advsior ; 
router.post("/new",isAdvisor, (req, res, next) => {
    res.send("Under construction");
});

//delete a message with the given message_id;
router.delete("/:id",isAdvisor,(req, res, next) => {
    res.send("Under construction");
});

module.exports = router; 