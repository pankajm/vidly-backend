const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const {Rental, validate} = require('../models/rentals');
const {Customer} = require('../models/customers');
const {Movie} = require('../models/movies');

router.get('/', async (req, res) => {
  const rentals = await Rental.find();
  return res.send(rentals);
})

router.post('/', async (req, res) => {
  const rentalsSchema = {
    movieId : Joi.string().required(),
    customerId : Joi.string().required()
  }

  const validation = validate(rentalsSchema, req.body);
  if(validation.error)
    return res.status(400).send(validation.error);

  const customer = await Customer
    .findById(req.body.customerId)
    .select('name isGold phone');

  const movie = await Movie
    .findById(req.body.movieId)
    .select('title dailyRentalRate');

  const rental = new Rental({
    customer,
    movie,
    rentalFee : 50,
    dateReturned: null
  })

  const result = await rental.save();
  return res.send(result);
})

router.get('/:id', async (req, res) => {
  const rental = await Rental.findById(req.params.id);
  return res.send(rental);
})

router.delete('/:id', async (req, res) => {
  const rental = await Rental.findByIdAndRemove(req.params.id);
  return res.send(rental);
})

router.put('/:id', async (req, res) => {
  const rental = await Rental.findByIdAndUpdate(req.params.id, req.body, {new:true});
  return res.send(rental);
})

module.exports = router;