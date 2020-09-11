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

//Delete a list 
router.delete('lists/:id',function(req,res,next) {
    var id = req.params.id;
    User.findByIdAndDelete({_id : id }),function(err,user) {
        if (err) {
            return next(err);
        }
        if (user === null) {
            return res.status(404).json({"message":"Unfortunately the list was not found"});
        }
        res.json.list;    
    }
})


module.exports = router;