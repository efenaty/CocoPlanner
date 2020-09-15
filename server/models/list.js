var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Define ListSchema 
var listSchema = new Schema({
    name : { type : String , required : true },
    is_favorite_list : { type : Boolean },
    user : { type : Schema.Types.ObjectId , ref : 'User'} ,
    tasks : [{ type :Schema.Types.ObjectID , ref : 'Task'}],
    items : [{ type : Schema.Types.ObjectId , ref : 'Item'}]
});
   module.exports = mongoose.model('lists', listSchema);
   
