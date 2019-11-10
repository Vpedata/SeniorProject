const router = require('express').Router();
const isStudent = require("./studentAuth.js");
const db = require("../../config/db.js");

//Return all the messages of the current student; 
router.get("/all/:id",isStudent, (req, res, next)=>{
    var sql = "CALL getAllChatsForStudent(?);";
    db.query(sql,req.user.student_ID, (err, rows, fields) => {
        if (err) throw err;
        res.send(rows);
    });
});

//Send a message to student's advisor; 
router.post("/:message",isStudent, (req, res, next) => {
    sql = "CALL sendMessageAsStudent(?,?);"
    db.query(sql,[req.params.message,req.user.student_ID], (err, rows, fields) => {
        if (err) throw err;
        res.send(rows);
    });
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