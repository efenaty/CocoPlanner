var express = require('express');
var router = express.Router();

var List = require('../models/list');
var Task = require('../models/task');
var Item = require('../models/item');
const list = require('../models/list');
/*const { route } = require('./items');
const { route } = require('./tasks');*/


// create a list 
router.post('/lists',function(req,res,next){
    var list = new List(req.body);
    list.save(function(err){
        if(err){
             return next(err);
        }
        res.status(201).json(list);
    });
});


// show all the normal lists 
router.get('/lists', function(req, res, next){
    List.find({ is_favorite_list : false },function(err, lists){
        if(err){
            return next(err);
        }

        if(lists == null){
            return res.status(404).json({"message":"Lists not found."});
        }

        res.status(200).json({"Your normal lists are": lists});
    });
});

// show all the favorite lists
router.get('/lists/fav', function(req, res, next){
    List.find({ is_favorite_list : true },function(err, lists){
        if(err){
            return next(err);
        }
        if(lists == null){
         return res.status(404).json({"message":"Lists not found."});
        }
        res.status(200).json({"Your favorite lists are": lists});
    });
});

// show a certain list (both normal and favorite)
router.get('/lists/:id', function(req, res, next){
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

// change the name of the list (both normal and favorite)
router.put('/lists/:id', function(req, res, next){
    var id = req.params.id;
    List.findById(id,function(err, list){
        if(err){ 
            return next(err);
        }
        if(list == null) {
         return res.status(404).json({"message":"List not found."});
        }
        list.name = req.body.name ;
        list.save();
        res.json(list);
    });
});


// delete a certain list (both normal and favorites)
router.delete('/lists/:id',function(req, res, next){
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



//////////////********************************Task operations********************************//////////////////////////



//Source : https://kb.objectrocket.com/mongo-db/how-to-join-collections-using-mongoose-228 
//***/
// add a task to a list
router.post('/lists/:id/tasks',function(req,res,next){
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


// show the tasks of a certain list
router.get('/lists/:id/tasks', function(req, res, next){
    var id = req.params.id;
    List.findById({ _id : id }).populate('tasks').exec(function(err,list){
        if(err){ 
            return next(err);
        }
        if(list == null){
         return res.status(404).json({"message":"List not found."});
        }
         res.status(200).json(list.tasks);
    });
});


// sort the tasks of a certain list by name
router.get('/lists/:id/tasks/sortbyName', function(req, res, next){
    var id = req.params.id;
    List.findById({ _id : id }).populate({path: 'tasks', options: { sort: { name: 1 } } }).exec(function(err,list){
        if(err){ 
            return next(err);
        }
        if(list == null){
         return res.status(404).json({"message":"List not found."});
        }
         res.status(200).json(list.tasks);
    })
});


// sort the tasks of a certain list by name and startDate
router.get('/lists/:id/tasks/sortbyNameandStartDate', function(req, res, next){
    var id = req.params.id;
    List.findById({ _id : id }).populate({path: 'tasks', options: { sort: { name: 1, startDate: 1 } } }).exec(function(err,list){
        if(err){ 
            return next(err);
        }
        if(list == null){
         return res.status(404).json({"message":"List not found."});
        }
         res.status(200).json(list.tasks);
    })
});



// show aspecific task of a list
router.get('/lists/:id/tasks/:task_id', function(req, res, next){
    var id = req.params.id;
    List.findById({ _id : id }).populate('tasks').exec(function(err,list){
        if(err){ 
            return next(err);
        }
        if(list == null){
         return res.status(404).json({"message":"List not found."});
        }
        var array = [];
        for ( i=0 ; i<list.tasks.length ; i++){
            if(list.tasks[i]._id == req.params.task_id)
            array.push(list.tasks[i]);
        }
    res.status(200).json(array);
    });
});


// update a task
router.patch('/lists/:id/tasks/:task_id', function (req, res, next){
    var id = req.params.id;
    List.findById({ _id : id }).populate('tasks').exec(function(err,list){
        if(err){ 
            return next(err);
        }
        if(list == null){
         return res.status(404).json({"message":"List not found."});
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



    // delete a task in the list 
    router.delete('/lists/:id/tasks/:task_id', function(req, res, next){
        var id = req.params.id;
        const task_id = req.params.task_id;
        List.findOne({_id : id} , function(err, list){
            if (err) {
                return next(err);
            }
            if (list == null){
                return res.status(404).json({"message":"Task not found."});
            }
            var index;
            index = list.tasks.indexOf(task_id);
            list.tasks.splice(index,1);
            list.save();
        Task.findByIdAndDelete({_id : task_id} , function(err,task){
            if (err) {
                return next(err);
            }
            if (list == null){
                return res.status(404).json({"message":"Task not found."});
            }   
        })
            res.status(200).json(list.tasks);
        });
        });



//////////////********************************Item operations********************************//////////////////////////

 
// add an item to a list 
router.post('/lists/:id/items',function(req,res,next){
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


// show the items of a certain favorite list 
router.get('/lists/:id/items', function(req, res, next){
    var id = req.params.id;
    List.findById({ _id : id }).populate('items').exec(function(err,list){
        if(err){ 
            return next(err);
        }
        if(list == null){
         return res.status(404).json({"message":"List not found."});
        }
         res.status(200).json(list.items);
    });
});




// update an item
router.patch('/lists/:id/items/:item_id', function (req, res, next){
    var id = req.params.id;
    List.findById({ _id : id }).populate('items').exec(function(err,list){
        if(err){ 
            return next(err);
        }
        if(list == null){
         return res.status(404).json({"message":"List not found."});
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


    // delete an item in the favorite list 
    router.delete('/lists/:id/items/:item_id', function(req, res, next){
        var id = req.params.id;
        const item_id = req.params.item_id;
        List.findOne({_id : id} , function(err, list){
            if (err) {
                return next(err);
            }
            if (list == null){
                return res.status(404).json({"message":"Item not found."});
            }
            var index;
            index = list.items.indexOf(item_id);
            list.items.splice(index,1);
            list.save();
            Item.findByIdAndDelete({_id : item_id} , function(err,item){
                if (err) {
                    return next(err);
                }
                if (item == null){
                    return res.status(404).json({"message":"Item not found."});
                }  
            res.status(200).json(list.items);
        });
        });
    });



module.exports = router;
