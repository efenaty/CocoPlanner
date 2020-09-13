var express = require('express');
var router = express.Router();

var List = require('../models/list');

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
router.get('/lists', function(req, res, next) {
    List.find({ is_favorite_list : "false" },function(err, lists) {
        if(err) {
            return next(err);
        }
        if(list==null){
            return res.status(404).json({"message":"Unfortunately the list was not found"});
        }
        res.json({"The normal lists are ": lists});
    });
});

//Show all the favorite lists
router.get('/lists/fav', function(req, res, next) {
    List.find({ is_favorite_list : "true" },function(err, lists) {
        if(err) {
            return next(err);
        }
        if(list == null){
         return res.status(404).json({"message":"Unfortunately the list was not found"});
        }
        res.json({"The favorite lists are ": lists});
    });
});

//Show a certain list
router.get('/lists/:id' , function(req,res,next){
    var id = req.params.id;
    List.findById({ _id : id }) , function(err,lists){
        if (err) {
            return next(err);
        }
        if (list === null) {
            return res.status(404).json({"message":"Unfortunately the list was not found"});
        }
        res.json({ lists});
    }
});

//Delete a certain list 
router.delete('/lists/:id',function(req,res,next) {
    var id = req.params.id;
    User.findByIdAndDelete({_id : id }),function(err,user) {
        if (err) {
            return next(err);
        }
        if (list === null) {
            return res.status(404).json({"message":"Unfortunately the list was not found"});
        }
        res.json.list;    
    }
});


module.exports = router;