var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Task = require('../models/task');
var User = require('../models/user');
var Item = require('../models/item');

//Define ListSchema 
var listSchema = new Schema({
    name : { type : String , required : true },
    is_favorite_list : { type : Boolean },
    user : { type : Schema.Types.ObjectId , ref : User} ,
    tasks : [{ type : Schema.Types.ObjectID , ref : Task}],
    items : [{ type : Schema.Types.ObjectId , ref : Item}]
});
 module.exports = mongoose.model('lists', listSchema); 
 
    