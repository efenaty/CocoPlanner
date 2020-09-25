var express = require('express');
var router = express.Router();

var User = require('../models/user');
var List = require('../models/list');
var Task = require('../models/task');
var Item = require('../models/item');

const list = require('../models/list');



//Create a list
router.post('/api/lists',function(req,res,next){
    var list = new List(req.body);
    var id = list.user;

    User.findOne({_id: id}, function(err , user ){
        if (err){
             return next(err);
        }

        if(user == null) {
            return res.status(404).json({"message" : "Sorry, the user does not exist XD."});
        }
        list.save(function(err){
            if(err){
                return next(err);
            }
            res.status(201).json(list);
        });
        
    });
});


//show normal lists or favorite lists 
router.get('/api/lists', function(req, res){
    var query = {};
    if(req.query.is_favorite_list) query.is_favorite_list = req.query.is_favorite_list;

    List.find(query, function (err, lists) {
        if(err){
        return next(err); }
            
        if(lists == null){
         return res.status(404).json({"message":"Lists not found."});}
        
        return res.status(200).json(lists);
    });   
});


//Update all list's information
router.put("/api/lists/:id" , function(req, res, next){
    var id = req.params.id;
    List.findById(id, function(err , list){
        if (err){
             return next(err);
            }
        if(list == null) {
            return res.status(404).json({"message" : "List not found."});
        }
    list.name = req.body.name;
    list.is_favorite_list = req.body.is_favorite_list;
    list.user = req.body.user;
    list.save();
    res.status(200).json(list);
    })
});



//Show a certain list
router.get('/api/lists/:id', function(req, res, next){
    var id = req.params.id;
    List.findById(id,function(err, list){
        if(err){ 
            return next(err);
        }
        if(list == null){
         return res.status(404).json({"message":"List not found."});
        }
        res.status(200).json(list);
    });
});

//Change the list type
router.patch('/api/lists/:id', function(req, res, next){
    var id = req.params.id;
    List.findById(id,function(err, list){
        if(err){ 
            return next(err);
        }
        if(list == null) {
         return res.status(404).json({"message":"List not found."});
        }
        list.name = req.body.name;
        list.save();
        res.status(200).json(list);
    });
});

//Delete a certain list 
router.delete('/api/lists/:id',function(req, res, next){
    var id = req.params.id;
    List.findOneAndDelete({_id : id },function(err,list){
        if (err){
            return next(err);
        }
        if (list == null){
            return res.status(404).json({"message":"List not found."});
        }
        res.status(200).json(list);    
    });
});


//Add a task to a list
//Source : https://kb.objectrocket.com/mongo-db/how-to-join-collections-using-mongoose-228 
router.post('/api/lists/:id/tasks',function(req,res,next){
    var id = req.params.id;
    var task = new Task(req.body);
    task.save(function(err){
        if(err){
             return next(err);
            }
        List.findByIdAndUpdate(id, { $push: { tasks: task } }).exec(function(err){
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
router.post('/api/lists/:id/items',function(req,res,next){
    var id = req.params.id;
    var item = new Item(req.body);
    item.save(function(err){
        if(err){
             return next(err);
        }
        List.findByIdAndUpdate(id, { $push: { items: item } }).exec(function(err){
            if(err){
                return next(err);
            };
            item.list = id;
            item.save();
            res.status(201).json(item);  
        });
    });
});

//Show the tasks of a certain list
router.get('/api/lists/:id/tasks', function(req, res, next){
    var id = req.params.id;
    List.findById({ _id : id }).populate('tasks').exec(function(err,list){
        if(err){ 
            return next(err);
        }
        if(list == null){
         return res.status(404).json({"message":"List not found."});
        }
         res.status(200).json(list.tasks)
    });
});

//Sort the tasks of a certain list by name
router.get('/api/lists/:id/tasks', function(req, res, next){
    var id = req.params.id;
    var query = {};
    if(req.query.name) query.name = req.query.name;
    
    List.findById({ _id : id }).populate({path: 'tasks', options: { sort: {name : query.name} }}).exec(function(err,list){
        if(err){ 
            return next(err);
        }
        if(list == null){
         return res.status(404).json({"message":"List not found."});
        }
        res.status(200).json(list.tasks)
    })
});


//Sort the tasks of a certain list by name and startDate
// router.get('/api/lists/:id/tasks/sortbyNameandStartDate', function(req, res, next){
//     var id = req.params.id;
//     List.findById({ _id : id }).populate({path: 'tasks', options: { sort: { name: 1, startDate: 1 } } }).exec(function(err,list){
//         if(err){ 
//             return next(err);
//         }
//         if(list == null){
//          return res.status(404).json({"message":"List not found."});
//         }
//          res.status(200).json(list.tasks)
//     })
// });

//Show the items of a certain favorite list 
router.get('/api/lists/:id/items', function(req, res, next){
    var id = req.params.id;
    List.findById({ _id : id }).populate('items').exec(function(err,list){
        if(err){ 
            return next(err);
        }
        if(list == null){
         return res.status(404).json({"message":"List not found."});
        }
         res.status(200).json(list.items)
    });
});

//Show the specific task of a list
router.get('/api/lists/:id/tasks/:task_id', function(req, res, next){
    var id = req.params.id;
    var task_id = req.params.task_id;
    List.findById({ _id : id }).populate('tasks').exec(function(err,list){
        if(err){ 
            return next(err);
        }
        if(list == null){
         return res.status(404).json({"message":"List not found."});
        }
        Task.findById(task_id, function (err, task){
            if (err){
                return next(err);
            }
            if(task == null){
                return res.status(404).json({"message": "Task not found"});
            }
        
        var array = [];
        for ( i=0 ; i<list.tasks.length ; i++){
            if(list.tasks[i]._id == task_id)
            array.push(list.tasks[i]);
        }
    res.status(200).json(array);
      })
    });
});

//Show the specific task of a  list
router.get('/api/lists/:id/tasks/:task_id', function(req, res, next){
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
    res.status(200).json(array);
    });
});

//Delete a task in the list 
router.delete('/api/lists/:id/tasks/:task_id', function(req, res, next){
    var id = req.params.id;
    var task_id = req.params.task_id;
    // const task_id = req.params.task_id;
    List.findById({ _id : id }).populate('tasks').exec(function(err,list){
        if (err) {
            return next(err);
        }
        if (list == null){
            return res.status(404).json({"message":"List not found."});
        }
        var index;
        index = list.tasks.indexOf(task_id);
       //list.tasks.splice(index,1);
        list.tasks.remove(task_id);
        list.save();
    })
    Task.findOneAndDelete({_id: req.params.task_id} , function(err,task){
        if (err) {
            return next(err);
        }
        if (task == null){
            return res.status(404).json({"message":"Task not found."});
        }
        // var array = [];
        // for ( i=0 ; i<list.tasks.length ; i++){
        //     if(list.tasks[i]._id == task_id)
        //     array.push(list.tasks[i]);
        // }
        res.status(200).send();
        //res.status(200).json(list.tasks);
        });
        // res.status(200).json(list.tasks);
    });

    
//Delete an item in a list
router.delete('/api/lists/:id/items/:item_id', function(req, res, next){
    var id = req.params.id;
    var item_id = req.params.item_id;
    // const task_id = req.params.task_id;
    List.findById({ _id : id }).populate('items').exec(function(err,list){
        if (err) {
            return next(err);
        }
        if (list == null){
            return res.status(404).json({"message":"List not found."});
        }
        var index;
        index = list.items.indexOf(item_id);
       //list.tasks.splice(index,1);
        list.tasks.remove(item_id);
        list.save();
    })
    Item.findOneAndDelete({_id: req.params.item_id} , function(err,item){
        if (err) {
            return next(err);
        }
        if (item == null){
            return res.status(404).json({"message":"Item not found."});
        }
        // var array = [];
        // for ( i=0 ; i<list.tasks.length ; i++){
        //     if(list.tasks[i]._id == task_id)
        //     array.push(list.tasks[i]);
        // }
        res.status(200).send();
        //res.status(200).json(list.tasks);
        });
        // res.status(200).json(list.tasks);
    });
    
//Update a task
router.patch('/api/lists/:id/tasks/:task_id', function (req, res, next){
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
        array[0].name=(req.body.name || array[0].name);
        array[0].startDate=(req.body.startDate || array[0].startDate);
        array[0].endDate=(req.body.endDate || array[0].endDate);
        array[0].save();
        res.status(200).json(array[0]);
    });
});

//Update an item
router.patch('/api/lists/:id/items/:item_id', function (req, res, next){
    var id = req.params.id;
    List.findById({ _id : id }).populate('items').exec(function(err,list){
        if(err){ 
            return next(err);
        }
        if(list == null){
         return res.status(404).json({"message":"Unfortunately the list was not found"});
        }
        var array = [];
        for ( i=0 ; i<list.items.length ; i++){
            if(list.items[i]._id == req.params.item_id)
            array.push(list.items[i]);
        }
        array[0].name=(req.body.name || array[0].name);
        array[0].review=(req.body.review|| array[0].review);
        array[0].rating=(req.body.rating || array[0].rating);
        array[0].save();
        res.status(200).json(array[0]);
    });
});

// //sort
// router.get("/lists/:id/tasks/sortbyname").get(function(req, res, next) {
//     detail
//       .find({}, function(err, result) {
//         if (err) {
//           return next(err);
//         } else {
//           res.json(result);
//         }
//       })
//       .sort({ name : 1});
//   });
    

module.exports = router;
