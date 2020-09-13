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


//View all tasks
router.get('/lists/tasks', function (req,res,next){
    Task.find(function (err, tasks){
        if(err){
            return next(err);
        }
        res.json({"tasks" : tasks})
    });
});


// View a specific task by ID
router.get('/lists/tasks/:id', function (req, res, next){
    var id = req.params.id;
    Task.findById(id,function (err, task){
        if (err){
            return next(err);
        }
        if (task == null){
            return res.status(404).json({"message": "Task not found"});
        }
        res.json(task);
    });
});


//Update a task
router.patch('/lists/tasks/:id', function (req, res, next){
    var id = req.params.id;
    Task.findById(id,function(err, task){
        if(err){
            return next(err);
        }
        if (task == null){
            return res.status(404).json({"message": "Task not found"});
        }
        task.name = (req.body.name || task.name);
        task.startDate = (req.body.startDate || task.startDate);
        task.endDate = (req.body.endDate || task.endDate);
        task.list = (req.body.list || task.list);
        task.save();
        res.json(task);
    });
    
});

//Delete a task 
router.delete('/lists/tasks/:id',function(req,res,next){
    var id = req.params.id;
    Task.findByIdAndDelete({_id : id }),function(err,task){
        if (err){
            return next(err);
        }
        if (task == null) {
            return res.status(404).json({"message":"Unfortunately the task does not exist"});
        }
        res.json(task);    
    }
});





module.exports = router;