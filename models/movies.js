const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const {genresSchema} = require('./genres');

let moviesSchema = new mongoose.Schema({
  title: String,
  genre: genresSchema,
  numberInStock: Number,
  dailyRentalRate: Number
})

let Movie = mongoose.model('movie', moviesSchema);

function validate(body, schema){             // Validate input using
  const joiSchema = Joi.object(schema);
  const result =  joiSchema.validate(body);
  return result;
}

module.exports.validate = validate;
module.exports.Movie = Movie;