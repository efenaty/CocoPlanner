var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var User = require('../models/user');
var mongoose = require ("mongoose");


//Create a new user or sign up
router.post('/api/users', function(req, res, next){
    var user = new User(req.body);
    user.save(function(err) {
    if (err) {
         return next(err);
        }
    res.status(201).json(user);
    });
});

//Logging in
router.post('/api/login', function (req, res, next){
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({ username: username, password: password},function (err,user){
        if(err){
            return next(err);
        }
        if(!user){
            res.status(404).json({"message": "User not found."});
        }
        res.status(200).json(user);
});
});

//Find a specific user
router.get('/api/users/:id', function (req, res, next){
    var id = req.params.id
    User.findById({ _id : id },function (err,user){
        if(err){
            return next(err);
        }
        if(user == null){
            res.status(404).json({"message": "User not found."});
        }
        res.status(200).json(user);
});
}); 

    
//Update all user's information
router.put("/api/users/:id" , function(req, res, next){
    var id = req.params.id;
    if( mongoose.Types.ObjectId.isValid(id) ){
    User.findById(id, function(err , user ){
        if (err){
             return next(err);
            }
        if(user == null) {
            return res.status(404).json({"message" : "User not found."});
        }
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;
    user.birthDate = req.body.birthDate;
    user.save();
    res.status(200).json(user);
    })
}else{
    return res.status(404).json({message: "Check the ID"});
}
});

//Update any of user's information
router.patch("/api/users/:id" , function(req, res, next){
    var id = req.params.id;
    if( mongoose.Types.ObjectId.isValid(id) ){
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
    })}else{
        return res.status(404).json({message: "Check the ID"});}
    
});

//Delete a specific user 
router.delete('/api/users/:id', function(req, res, next){
    var id = req.params.id;
    if( mongoose.Types.ObjectId.isValid(id) ){
    User.findOneAndDelete({_id: id}, function(err, user){
    if (err){ 
        return next(err);
    }
    if (user == null){
    return res.status(404).json({"message": "User not found."});
    }
    res.status(200).json(user);
    });
}else{
    return res.status(404).json({message: "Check the ID"});
}
});

//Show all the users 
router.get('/api/users', function(req, res, next){
    User.find(function(err,users){
        if(err){
            return next(err);
        }
        if(users == null) {
            return res.status(404).json({"message": "User not found."});
        }
        res.status(200).json({"The users are": users});
    })
});

//Delete all users
router.delete('api/users', function (req, res, next){
    User.deleteMany({ username : { $ne : null } } , function (err, users){
        if (err){
            return next(err);
        }
        if(users == null){
            res.status(404).json({"message": "No users exist to delete :3"});
        }
        res.status(200).json(users);
    })
})






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
    

// router.get('/dashboard', function (req,res){
//     if(!req.session.user){
//         return res.status(401).json({"message": "Sorry, you are not logged in"});
//     }

//     return res.status(200).send("Welcome to CoCoPlanner");
// });


module.exports = router;