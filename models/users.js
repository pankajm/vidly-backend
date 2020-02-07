const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const userSchema = new mongoose.Schema({
  name:{
    type : String,
    minlength : 5,
    maxlength : 50
  },
  email : {
    type : String,
    unique : true
  },
  password : {
    type : String,
    minlength : 5
  }
});

const User = mongoose.model('user', userSchema);

function validate(body){
  const userSchema = {
    name : Joi.string().min(5).max(50).required(),
    email : Joi.string().required().email(),
    password : Joi.string().required()
  }

  const joiSchema = Joi.object(userSchema);
  return joiSchema.validate(body);
}

module.exports.User = User;
module.exports.validate = validate;
