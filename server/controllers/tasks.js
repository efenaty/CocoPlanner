var express = require('express');
var router = express.Router();

var Task = require('../models/task');


//Create a task 
router.post('/lists/tasks',function(req,res,next){
    var task = new Task(req.body);
    task.save(function(err){
        if(err){
             return next(err);
            }
        res.status(201).json(task);
    });
});



module.exports = router;