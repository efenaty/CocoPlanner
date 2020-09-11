var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Define ListSchema 
var listSchema = new Schema({
    type : { type : String , required : true , enum : [ 'To-do list' , 'Shopping List' , 'Budget List' ]},
    favotite_list : { type : Boolean },
    user : { type : Schema.Types.ObjectId , ref : 'User'} 
});


   module.exports = mongoose.model('lists', listSchema);
