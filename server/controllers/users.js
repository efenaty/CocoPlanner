var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var User = require('../models/user');


//Create a new user or sign up
router.post('/users', function(req, res, next){
    var user = new User(req.body);
    user.save(function(err) {
    if (err) {
         return next(err);
        }
    res.status(201).json(user);
    });
});


 //Loging in
router.post('/login', function (req, res, next){
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({username: username}, function (err, user){
        if(err){
            return next(err);
        }
        user.comparePassword(password, function (err, isMatch){
            if (err){
                return next(err);
            }
        })
            
        
        //req.session.user = user;
        res.status(200).json(user);
    
         });
    
});


// router.get('/dashboard', function (req,res){
//     if(!req.session.user){
//         return res.status(401).json({"message": "Sorry, you are not logged in"});
//     }

//     return res.status(200).send("Welcome to COcoPlannerr");


// });


// //Get all users (for testing)
// router.get('/users', function(req, res, next){
//     User.find(function(err, users){
//         if (err){
//              return next(err);
//             }
//             res.status(200).json({'users': users });
//         })
//     });

//Get a specific user
router.get('/users/:id', function(req, res, next){
    var id = req.params.id;
    User.findById(req.params.id, function(err, user){
        if (err){
             return next(err);
            }
        if (user == null){
            return res.status(404).json({"message" : "User not found."});
        }
        res.status(200).json(user);
        });
    });

    

//Update user's information
router.patch("/users/:id" , function(req, res, next){
    var id = req.params.id;
    User.findById(req.params.id, function(err , user ){
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
router.delete('/users/:id', function(req, res, next){
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