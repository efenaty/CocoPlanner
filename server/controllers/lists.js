var express = require('express');
var router = express.Router();
var List = require('../models/list');
var Task = require('../models/task');
var Item = require('../models/item');
const { route } = require('./items');

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

//Add a task to a list 
router.post('/lists/:id/task',function(req,res,next){
    var task = new Task(req.body);
    task.save(function(err){
        if(err){
             return next(err);
            }
        List.findByIdAndUpdate({_id : req.params.id} , {tasks : task._id} , {new : true},function(err){
            if(err){
                return next(err);
               };
               res.json(task);  
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

//Show all the normal lists 
router.get('/lists', function(req, res, next){
    List.find({ is_favorite_list : false },function(err, lists){
        if(err){
            return next(err);
        }

        if(lists == null){
            return res.status(404).json({"message":"The lists were not found."});
        }

        res.json({"The normal lists are ": lists});
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
        res.json({"The favorite lists are ": lists});
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
        res.json(list);
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
    List.findByIdAndDelete({_id : id }),function(err,user){
        if (err){
            return next(err);
        }
        if (list == null){
            return res.status(404).json({"message":"Unfortunately the list was not found"});
        }
        res.json.list;    
    }
});


module.exports = router;
