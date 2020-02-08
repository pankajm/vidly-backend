const {validate, Movie} = require('../models/movies');
const mongoose = require('mongoose');
const express = require('express');
const {Genre} = require('../models/genres');
const router = express.Router();
const auth = require('../middleware/auth');

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

router.post('/', auth, async (req, res) => {

  let validation = validate(req.body);
  if(validation.error)
    return res.status(400).send(validation.error);

  const genre = await Genre
    .findById(req.body.genreId)
    .select('_id type');

  if(!genre)
    return res.status(404).send('No Genre found for given id');

  const movie = new Movie({
    title : req.body.title,
    genre : genre,
    numberInStock : req.body.numberInStock,
    dailyRentalRate : req.body.dailyRentalRate 
  });

  const result = await movie.save();
  return res.send(result);
})

router.put('/:id', auth, [
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

router.delete('/:id', [auth, 
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