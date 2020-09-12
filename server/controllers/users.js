var express = require('express');
var router = express.Router();


var User = require('../models/user');


//Create a new user or sign up
router.post('/users', function(req, res, next) {
    var user = new User(req.body);
    user.save(function(err) {
    if (err) {
         return next(err);
         }
    res.status(201).json(user);
    });
    });

    //User Login
    router.post('/login', function (req, res, next){
        var email = req.body.email
        var password = req.body.password
        User.findOne({email: password}, function (err, user){
            if (err) {
                return next(err);
            }
            if(user){
                res.status(201).json({"message" : "Login successful"})
            }
            if(user === null) {
                return res.status(400).json({"message":"Unfortunately The user was not found"});
            }
        });
        
    });

    //Get all users (for testing)
    router.get('/users', function(req, res, next) {
        User.find(function(err, users) {
            if (err) { return next(err); }
            res.json({'users': users });
        })
    });
    

//Update user's information
router.patch("users/:id" , function(req,res,next) {
    var id = req.params.id;
    User.findById(id,function(err , user ) {
        if (err) {
             return next(err);
             }
        if(user === null) {
            return res.status(400).json({"message":"Unfortunately The user was not found"});
        }
    user.username = ( user.username || req.body.username);
    user.password = ( user.password || req.body.password);
    user.email = ( user.email || req.body.email);
    user.birthDate = ( user.birthDate || req.body.birthDate);
    res.json(user);
    })
})

//Delete a specific user 
router.delete('users/:id',function(req,res,next) {
    var id = req.params.id;
    User.findByIdAndDelete({_id : id }),function(err,user) {
        if (err) {
            return next(err);
        }
        if (user === null) {
            return res.status(404).json({"message":"Unfortunately the user was not found"});
        }
        res.json.user;    
    }
})




module.exports = router;