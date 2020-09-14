var express = require('express');
var router = express.Router();

var Item = require('../models/item');


// create an item  
router.post('/lists/items',function(req,res,next) {
    var item = new Item(req.body);
    item.save(function(err){
        if(err) {
             return next(err);
            }
        res.status(201).json(item);
    });
});

// view all items
router.get('/lists/items', function(req,res,next) {
    Item.find(function(err, items) {
        if(err){
            return next(err);
        }
        res.json({"items" : items})
    });
});


// view an item by ID 
router.get('/lists/items/:id', function (req, res, next){
    var id = req.params.id;
    Item.findById(id,function (err, item){
        if (err){
            return next(err);
        }
        if (item == null){
            return res.status(404).json({"message": "Item not found."});
        }
        res.json(item);
    });
});


// update an item (all parameters together)
router.put('/lists/items/:id', function(req, res, next) {
    var id = req.params.id;
    Item.findById(id,function(err, item) {
        if(err) {
            return next(err);
        }
        if (item == null) {
            return res.status(404).json({"message": "Item not found."});
        }
        item.name = (req.body.name || item.name);
        item.review = (req.body.review || item.review);
        item.rating = (req.body.rating || item.rating);
        item.list = (req.body.list || item.list);//???
        item.save();
        res.json(item);
    });
});


// update item's name only (one parameter)
router.patch('/lists/items/:id', function(req, res, next) {
    var id = req.params.id;
    Item.findById(id,function(err, item) {
        if(err) { 
            return next(err);
        }

        if(item == null) {
         return res.status(404).json({"message": "Item not found."});
        }

        item.name = req.body.name ;
        item.save();
        res.json(item);
    });
});

// update item's review only (one parameter)
router.patch('/lists/items/:id', function(req, res, next) {
    var id = req.params.id;
    Item.findById(id,function(err, item) {
        if(err) { 
            return next(err);
        }

        if(item == null) {
         return res.status(404).json({"message": "Item not found."});
        }

        item.review = req.body.review ;
        item.save();
        res.json(item);
    });
});

// update item's rating only (one parameter)
router.patch('/lists/items/:id', function(req, res, next) {
    var id = req.params.id;
    Item.findById(id,function(err, item) {
        if(err) { 
            return next(err);
        }

        if(item == null) {
         return res.status(404).json({"message": "Item not found."});
        }

        item.rating = req.body.rating ;
        item.save();
        res.json(item);
    });
});


// delete an item 
router.delete('/lists/items/:id',function(req,res,next) {
    var id = req.params.id;
    Item.findByIdAndDelete({_id : id}), function(err, item){
        if (err) {
            return next(err);
        }
        if (item == null) {
            return res.status(404).json({"message" : "Unfortunately, this item does not exist."});
        }
        res.json(item);    
    }
});


module.exports = router;

