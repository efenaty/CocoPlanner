var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Define taskSchema 
var taskSchema = new Schema({
    name : { type : String , required : true },
    startDate : { type : Date , default : Date.now },
    endDate : { type : Date },
    list : { type : Schema.Types.ObjectId , ref : 'List'}
});
  module.exports = mongoose.model('tasks', taskSchema);