const router = require('express').Router();
const isStudent = require("./studentAuth.js");
const db = require("../../config/db.js");

//Return all the messages of the current student; 
router.get("/all",isStudent, (req, res, next)=>{
    var sql = "CALL getAllChatsForStudent(?);";
    db.query(sql,req.user.student_ID, (err, rows, fields) => {
        if (err) throw err;
        res.send(rows);
    });
});

//Send a message to student's advisor; 
router.post("/new",isStudent, (req, res, next) => {
    sql = "CALL sendMessageAsStudent(?,?);"
    db.query(sql,[req.body.messageString,req.user.student_ID], (err, rows, fields) => {
        if (err) throw err;
        res.send(rows);
    });
});

module.exports = router; 