var express = require('express');
var router = express.Router();
var List = require('../models/list');
var Task = require('../models/task');
var Item = require('../models/item');
/*const { route } = require('./items');
const { route } = require('./tasks');*/


//Create a list 
router.post('/lists',function(req,res,next){
    var list = new List(req.body);
    list.save(function(err){
        if(err){
             return next(err);
            }
        res.status(201).json(list);
    });
});


//Show all the normal lists 
router.get('/lists', function(req, res, next){
    List.find({ is_favorite_list : false },function(err, lists){
        if(err){
            return next(err);
        }

        if(lists == null){
            return res.status(404).json({"message":"Lists not found."});
        }

        res.status(200).json({"The normal lists are ": lists});
    });
});

//Show all the favorite lists
router.get('/lists/fav', function(req, res, next){
    List.find({ is_favorite_list : true },function(err, lists){
        if(err){
            return next(err);
        }
        if(lists == null){
         return res.status(404).json({"message":"The lists were not found."});
        }
        res.status(200).json({"The favorite lists are ": lists});
    });
});

//Show a certain list
router.get('/lists/:id', function(req, res, next){
    var id = req.params.id;
    List.findById(id,function(err, list){
        if(err){ 
            returnnext(err);
        }
        if(list == null){
         return res.status(404).json({"message":"Unfortunately the list was not found"});
        }
        res.status(200).json(list);
    });
});

//Change the list type
router.put('/lists/:id', function(req, res, next){
    var id = req.params.id;
    List.findById(id,function(err, list){
        if(err){ 
            return next(err);
        }
        if(list == null) {
         return res.status(404).json({"message":"Unfortunately the list was not found"});
        }
        list.name = req.body.name ;
        list.save();
        res.json(list);
    });
});


//Delete a certain list 
router.delete('/lists/:id',function(req,res,next){
    var id = req.params.id;
    List.findOneAndDelete({_id : id },function(err,list){
        if (err){
            return next(err);
        }
        if (list == null){
            return res.status(404).json({"message":"Unfortunately the list was not found"});
        }
        res.status(200).json(list);    
    });
});


//Add a task to a list
//Source : https://kb.objectrocket.com/mongo-db/how-to-join-collections-using-mongoose-228 
router.post('/lists/:id/tasks',function(req,res,next){
    var id = req.params.id;
    var task = new Task(req.body);
    task.save(function(err){
        if(err){
             return next(err);
            }
        List.findByIdAndUpdate({_id : req.params.id} , {tasks : task._id} , {new : true},function(err){
            if(err){
                return next(err);
               };
              task.list = id;
              task.save();
               res.status(201).json(task);  
            });
});
});
 
//Add an item to a list 
router.post('/lists/:id/item',function(req,res,next){
    var item = new Item(req.body);
    item.save(function(err){
        if(err){
             return next(err);
            }
        List.findByIdAndUpdate({_id : req.params.id} , {items : item._id} , {new : true},function(err){
            if(err){
                return next(err);
               };
               res.json(item);  
            });
});
});


//Show the tasks of a certain list
router.get('/lists/:id/tasks', function(req, res, next){
    var id = req.params.id;
    List.findById({ _id : id }).populate('tasks').exec(function(err,list){
        if(err){ 
            return next(err);
        }
        if(list == null){
         return res.status(404).json({"message":"Unfortunately the list was not found"});
        }
        
         res.json(list.tasks)
    
    });
});

//Show the items of a certain favororite list 
router.get('/lists/:id/item', function(req, res, next){
    var id = req.params.id;
    List.findById({ _id : id }).populate('items').exec(function(err,item){
        if(err){ 
            return next(err);
        }
        if(itemt == null){
         return res.status(404).json({"message":"Unfortunately the list was not found"});
        }
         res.json(list.items)
    });
});

//Show the specific task of a list
router.get('/lists/:id/tasks/:task_id', function(req, res, next){
    var id = req.params.id;
    List.findById({ _id : id }).populate('tasks').exec(function(err,list){
        if(err){ 
            return next(err);
        }
        if(list == null){
         return res.status(404).json({"message":"Unfortunately the list was not found"});
        }
        var array = [];
        for ( i=0 ; i<list.tasks.length ; i++){
            if(list.tasks[i]._id == req.params.task_id)
            array.push(list.tasks[i]);
        }
    res.json(array);
    });
});







module.exports = router;
