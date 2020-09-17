var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var User = require('../models/user');


//Create a new user or sign up
router.post('api/users', function(req, res, next){
    var user = new User(req.body);
    user.save(function(err) {
    if (err) {
         return next(err);
        }
    res.status(201).json(user);
    });
});


 //Logging in
router.post('api/login', function (req, res, next){
    var username = req.body.username;
    var password = req.body.password;


    User.findOne({username: username, password: password},function (err,user){
        if(err){
            return next(err);
        }
        if(!user){
            res.status(404).json({"message": "User not found."});
        }
        res.status(200).json(user);
});
    // User.findOne({username: username}, function (err, user){
    //     if(err){
    //         return next(err);
    //     }
    //     user.comparePassword(password, function (err, isMatch){
    //         if (err){
    //             return next(err);
    //         }
    //     })
    //     //req.session.user = user;
    //     res.status(200).json(user);
    
    //      });
    
});


// router.get('/dashboard', function (req,res){
//     if(!req.session.user){
//         return res.status(401).json({"message": "Sorry, you are not logged in"});
//     }

//     return res.status(200).send("Welcome to CoCoPlanner");
// });


    //Update all user's information
router.put("api/users/:id" , function(req, res, next){
    var id = req.params.id;
    User.findById(id, function(err , user ){
        if (err){
             return next(err);
            }
        if(user == null) {
            return res.status(404).json({"message" : "User not found."});
        }
    user.username = (req.body.username || user.username);
    user.password = (req.body.password || user.password);
    user.email = (req.body.email|| user.email);
    user.birthDate = (req.body.birthDate || user.birthDate);
    user.save();
    res.status(200).json(user);
    })
})


//Update any of user's information
router.patch("api/users/:id" , function(req, res, next){
    var id = req.params.id;
    User.findById(id, function(err , user ){
        if (err){
             return next(err);
            }
        if(user == null) {
            return res.status(404).json({"message" : "User not found."});
        }
    user.username = (req.body.username || user.username);
    user.password = (req.body.password || user.password);
    user.email = (req.body.email|| user.email);
    user.birthDate = (req.body.birthDate || user.birthDate);
    user.save();
    res.status(200).json(user);
    })
})

//Delete a specific user 
router.delete('api/users/:id', function(req, res, next){
    var id = req.params.id;
    User.findOneAndDelete({_id: id}, function(err, user){
    if (err){ 
        return next(err);
    }
    if (user == null){
    return res.status(404).json({"message": "User not found."});
    }
    res.status(200).json(user);
    });
    });

module.exports = router;