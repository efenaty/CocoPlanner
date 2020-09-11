var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
var path = require('path');
var cors = require('cors');
var history = require('connect-history-api-fallback');
const { isDate } = require('util');

//Re write from the github for an error 
mongoose.set('useCreateIndex', true)


// Variables
var mongoURI = process.env.MONGODB_URI || 'mongodb+srv://group_18:group18isthebest@cluster0.lns4b.mongodb.net/My_coco_planner?retryWrites=true&w=majority';
var port = process.env.PORT || 3000;


// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
    if (err) {
        console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
        console.error(err.stack);
        process.exit(1);
    }
    console.log(`Connected to MongoDB with URI: ${mongoURI}`);
});

// Create Express app
var app = express();
// Parse requests of content-type 'application/json'
app.use(bodyParser.json());
// HTTP request logger
app.use(morgan('dev'));
// Enable cross-origin resource sharing for frontend must be registered before api
app.options('*', cors());
app.use(cors());

//Define mangoose schema 
var Schema = mongoose.Schema;

//Define userSchema
var userSchema = new Schema({
    username : { type : String , required : true , unique : true },
    password : { type : String , required : true , minlength : 8 },
    email : { type : String , required : true },
    birthDate : { type : Date }
   });

//Define plannerSchema
var plannerSchema = new Schema({
    name : { type : String , required : true },
    user : { type : Schema.Types.ObjectId , ref:'User'}
})

//Define favoriteListSchema
var favoriteListSchema = new Schema({
    name : { type : String , required : true },
    item : {
        name : { type : String , required : true },
        review : { type : String },
        rating : { type : String }},
    
    user : { type : Schema.Types.ObjectId , ref : 'User'}    
});

//Define ListSchema 
var listSchema = new Schema({
    type : { type : String , required : true , enum : [ 'To-do list' , 'Shopping List' , 'Budget List' ]},
    
    planner : { type : Schema.Types.ObjectId , ref : 'Planner'} 
});

//Define taskSchema 
var taskSchema = new Schema({
    task : {
        name : { type : String , required : true },
        startDate : { type : Date , default : Date.now },
        endDate : { type : Date }
              },
    list : { type : Schema.Types.ObjectId , ref : 'List'}
});

var User = mongoose.model('users', userSchema);
var Planner = mongoose.model('planner',plannerSchema);
var FavoriteList = mongoose.model('favoriteLists',favoriteListSchema);
var List = mongoose.model('list',listSchema);
var Task = mongoose.model('task',taskSchema);

   // Import routes
app.get('/api', function(req, res) {
    res.json({'message': 'Welcome to your DIT341 backend ExpressJS project!'});
});


//Create a new user or sign up
app.post('/users', function(req, res, next) {
    var user = new User(req.body);
    user.save(function(err) {
    if (err) {
         return next(err);
         }
    res.status(201).json(user);
    });
    });

//Update user's information
app.patch("users/:id" , function(req,res,next) {
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
app.delete('users/:id',function(req,res,next) {
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


//Create a new planner 
app.post('/planners',function(req,res,next){
    var planner = new Planner(req.body);
    planner.save(function(err){
        if(err){ return next(err);}
        res.status(201).json(planner);
    });
});

//Update the planner's information 
app.patch('/planners/:id',function(req,res,next){
    var id = req.params.id;
    Planner.findById(id,function(err , user ) {
        if (err) {
             return next(err);
             }
        if(planner === null) {
            return res.status(400).json({"message":"Unfortunately The planner was not found"});
        }
        planner.name = req.body.name;
    })
    res.json(planner);
})

//Delete a planner 
app.delete('planner/:id',function(req,res,next) {
    var id = req.params.id;
    Planner.findByIdAndDelete({_id : id}),function(err,planner){
        if (err){
            return next(err);
        }
        if(planner === null) {
            return res.status(400).json({"message":"Unfortunately the planner was not found"});
        }
        res.json.planner
    }

})


//Create a list 
app.post('/planners/lists',function(req,res,next){
    var list = new List(req.body);
    list.save(function(err){
        if(err){
             return next(err);
            }
        res.status(201).json(list);
    });
});


//Create a favorite list 
app.post('/favlists',function(req,res,next){
    var favoriteList = new FavoriteList(req.body);
    favoriteList.save(function(err){
        if(err){ return next(err);}
        res.status(201).json(favoriteList);
    });
});
    

// Catch all non-error handler for api (i.e., 404 Not Found)
app.use('/api/*', function (req, res) {
    res.status(404).json({ 'message': 'Not Found' });
});

// Configuration for serving frontend in production mode
// Support Vuejs HTML 5 history mode
app.use(history());
// Serve static assets
var root = path.normalize(__dirname + '/..');
var client = path.join(root, 'client', 'dist');
app.use(express.static(client));

// Error handler (i.e., when exception is thrown) must be registered last
var env = app.get('env');
// eslint-disable-next-line no-unused-vars
app.use(function(err, req, res, next) {
    console.error(err.stack);
    var err_res = {
        'message': err.message,
        'error': {}
    };
    if (env === 'development') {
        err_res['error'] = err;
    }
    res.status(err.status || 500);
    res.json(err_res);
});

app.listen(port, function(err) {
    if (err) throw err;
    console.log(`Express server listening on port ${port}, in ${env} mode`);
    console.log(`Backend: http://localhost:${port}/api/`);
    console.log(`Frontend (production): http://localhost:${port}/`);
});

module.exports = app;
