var express = require('express');
var router = express.Router();

var Item = require('../models/item');


//Create an item  
router.post('/lists/items',function(req,res,next){
    var itam = new Itam(req.body);
    item.save(function(err){
        if(err){
             return next(err);
            }
        res.status(201).json(item);
    });
});


module.exports = router;

