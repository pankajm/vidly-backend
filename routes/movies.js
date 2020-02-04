const {validate, Movie} = require('../models/movies');
const mongoose = require('mongoose');
const express = require('express');
const Joi = require('@hapi/joi');
const router = express.Router();

router.get('/', async (req, res) => {
  const movies = await Movie.find();
  return res.send(movies);
})

router.get('/:id', 
  [(req, res, next) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
      return res.status(400).send('invalid object id');
    }
    next();
  }, 
  async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    return res.send(movie);
  }
])

router.post('/', async (req, res) => {

  const schema = {
    title: Joi.string().required(),
    genre: Joi.object().required(),
    numberInStock: Joi.number().required(),
    dailyRentalRate: Joi.number().required()
  }

  let validation = validate(req.body, schema);
  if(validation.error)
    return res.status(400).send(validation.error);

  const movie = new Movie(req.body);
  const result = await movie.save();
  return res.send(result);
})

router.put('/:id', [
  (req, res, next) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
      return res.status(400).send('invalid object id');
    }
    next();
  }, 
  async (req, res) => {
    const movie = await Movie.findByIdAndUpdate({_id:req.params.id}, req.body, {new:true});
    return res.send(movie);
  } 
])

router.delete('/:id', [
  (req, res, next) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
      return res.status(400).send('invalid object id');
    }
    next();
  }, 
  async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id, {useFindAndModify:false});
    return res.send(movie);
  }
])

module.exports = router;