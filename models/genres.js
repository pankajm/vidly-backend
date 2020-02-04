const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const genresSchema = new mongoose.Schema({
  type: {
    type: String, 
    required: true,
    minlength: 5,
    maxlength: 50 
  }
})

const Genre = mongoose.model('genre', genresSchema);

function validate(body, schema){             // Validate input using
  const joiSchema = Joi.object(schema);
  const result =  joiSchema.validate(body);
  return result;
}

exports.validate = validate;
exports.Genre = Genre;
exports.genresSchema = genresSchema;