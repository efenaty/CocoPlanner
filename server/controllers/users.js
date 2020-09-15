var express = require('express');
var router = express.Router();
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
    var email = req.body.email;
    var password = req.body.password;
    User.findOne({email: password}, function (err, user){
        if (err) {
            return next(err);
        }
        if(user){
            res.status(200).json({"message" : "Login successful."});
        }
        if(user === null) {
            return res.status(404).json({"message" : "User not found."});
        }
    });
    
});


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