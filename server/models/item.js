var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Define itemLSchema
var itemSchema = new Schema({
    name : { type : String , required : true },
    review : { type : String , required : true },
    rating : { type : Number , required : true},
    list : { type : Schema.Types.ObjectId , ref : 'List'}

});
   module.exports = mongoose.model('items', itemSchema);