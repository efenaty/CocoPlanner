var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
var path = require('path');
var cors = require('cors');
var session = require('express-session');
var history = require('connect-history-api-fallback');
const { isDate } = require('util');

var usersController = require('./controllers/users');
var listsController = require('./controllers/lists');
var tasksController = require('./controllers/tasks');
var itemsController = require('./controllers/items');

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
// var Schema = mongoose.Schema;
// var User = mongoose.model('users', userSchema);
// var List = mongoose.model('list',listSchema);
// var Task = mongoose.model('task',taskSchema);
// var Item = mongoose.model('item',itemSchema);

   // Import routes
app.get('/api', function(req, res) {
    res.json({'message': 'Welcome to your DIT341 backend ExpressJS project!'});
});

app.use(usersController);
app.use(listsController);
app.use(tasksController);
app.use(itemsController);

app.use(session({secret: "myesdvbjvbvdsjvgxn23344", resave: false, saveUninitialized:true}))


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
        err_res['error'] = err.stack;
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
