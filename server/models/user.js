var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

//Define userSchema
var userSchema = new Schema({
    username : { type : String , required : true , unique : true },
    password : { type : String , required : true ,  minlength : 8 },
    email : { type : String , required : true , unique : true },
    birthDate : { type : Date }
   });

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('users', userSchema);

