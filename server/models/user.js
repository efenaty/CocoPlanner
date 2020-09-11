var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Define userSchema
var userSchema = new Schema({
    username : { type : String , required : true , unique : true },
    password : { type : String , required : true , unique : true , minlength : 8 },
    email : { type : String , required : true },
    birthDate : { type : Date }
   });

   module.exports = mongoose.model('users', userSchema);

