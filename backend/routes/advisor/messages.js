const router = require('express').Router();
const isAdvisor = require("./advisorAuth.js");
const db = require("../../config/db.js");

//Return all the messages of the given student by student_ID for current advisor; 
router.get("/:student_ID",isAdvisor, (req, res, next)=>{
    var sql = "CALL getAllChatsForAdvisor(?,?)";
    db.query(sql,[req.user.advisor_ID,req.params.student_ID], (err, rows, fields) => {
        if (err) throw err;
        res.send(rows);
    });
});

//Send a message to student from a current advsior ; 
router.post("/new",isAdvisor, (req, res, next) => {
    var sql = "CALL sendMessageAsAdvisor(?, ?, ?)";
    var message = [req.body.messageString,req.user.advisor_ID,req.body.student_ID]
    db.query(sql,message, (err, rows, fields) => {
        if (err) throw err;
        res.send(rows);
    });
});



module.exports = router; 