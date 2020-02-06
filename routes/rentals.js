const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Rental, validate} = require('../models/rentals');
const {Customer} = require('../models/customers');
const {Movie} = require('../models/movies');
const Fawn = require('fawn');

Fawn.init(mongoose, 'transactions');  // for transactions

router.get('/', async (req, res) => {
  const rentals = await Rental.find();
  return res.send(rentals);
})

router.post('/', async (req, res) => {

  const validation = validate(req.body);
  if(validation.error)
    return res.status(400).send(validation.error);

  const customer = await Customer
    .findById(req.body.customerId)
    .select('name isGold phone');

  let movie = await Movie
    .findById(req.body.movieId);

  if(!customer)
    return res.send('No customer found for the given customer id');

  if(!movie || !movie.numberInStock)
    return res.send('Movie not available');

  const rental = new Rental({
    customer,
    movie : {
      title : movie.title,
      dailyRentalRate : movie.dailyRentalRate
    },
    rentalFee : 50,
    dateReturned: null
  })

  try{
    new Fawn.Task()
      .save('rentals', rental)
      .update('movies', {_id: movie._id}, { 
        $inc: { numberInStock : -1}
      })
      .run()
    
    return res.send(rental);
  }
  catch(error){
    console.log(error);
    return res.status(500).send('Something Failed');
  }

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