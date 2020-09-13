var express = require('express');
var router = express.Router();

var Item = require('../models/item');


//Create an item  
router.post('/lists/items',function(req,res,next){
    var item = new Item(req.body);
    item.save(function(err){
        if(err){
             return next(err);
            }
        res.status(201).json(item);
    });
});

//View all items
router.get('/lists/items', function (req,res,next){
    Item.find(function (err, items) {
        if(err){
            return next(err);
        }
        res.json({"items" : items})
    });
});


module.exports = router;

