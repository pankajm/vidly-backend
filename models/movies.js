const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const {genresSchema} = require('./genres');

let moviesSchema = new mongoose.Schema({
  title: String,
  genre: genresSchema,
  numberInStock: Number,
  dailyRentalRate: Number
})

let Movie = mongoose.model('movie', moviesSchema);

function validate(body){ 
  const schema = {
    title: Joi.string().required(),
    genreId: Joi.objectId().length(24).required(),
    numberInStock: Joi.number().required(),
    dailyRentalRate: Joi.number().required()
  }            
  const joiSchema = Joi.object(schema);
  const result =  joiSchema.validate(body);
  return result;
}

module.exports.validate = validate;
module.exports.Movie = Movie;