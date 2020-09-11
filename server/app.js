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
    password : { type : String , required : true , unique : true , minlength : 8 },
    email : { type : String , required : true },
    birthDate : { type : Date }
   });

//Define ListSchema 
var listSchema = new Schema({
    type : { type : String , required : true , enum : [ 'To-do list' , 'Shopping List' , 'Budget List' ]},
    favotite_list : { type : Boolean },
    user : { type : Schema.Types.ObjectId , ref : 'User'} 
});

//Define itemLSchema
var itemSchema = new Schema({
        name : { type : String , required : true },
        review : { type : String ,required : true },
        rating : { type : String , required : true},
        list : { type : Schema.Types.ObjectId , ref : 'List'}
    
    });
       
//Define taskSchema 
var taskSchema = new Schema({
    name : { type : String , required : true },
    startDate : { type : Date , default : Date.now },
    endDate : { type : Date },
    list : { type : Schema.Types.ObjectId , ref : 'List'}
});

var User = mongoose.model('users', userSchema);
var List = mongoose.model('list',listSchema);
var Task = mongoose.model('task',taskSchema);
var Item = mongoose.model('item',itemSchema);

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

//Create a list 
app.post('/lists',function(req,res,next){
    var list = new List(req.body);
    list.save(function(err){
        if(err){
             return next(err);
            }
        res.status(201).json(list);
    });
});

//Delete a list 
app.delete('lists/:id',function(req,res,next) {
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
