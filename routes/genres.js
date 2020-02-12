const express = require('express');
const router = express.Router();
const {Genre, validate} = require('../models/genres');
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');


router.get('/', (req, res, next) => {
  Genre.find()
    .then((result) => res.send(result))
    .catch((error) => next(error));
})

router.get('/:id', [
  (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).send('Invalid id');
    }
    next();
  },
  (req, res) => {
  
    Genre.findById(req.params.id)
      .then((genre) => res.send(genre))
      .catch((error) => res.send(error));
  }
]);

router.post('/', auth, (req, res) => {
  
  const result = validate(req.body);
  if(result.error)
    return res.status(400).send(result.error);

  const genre = new Genre({
    type: req.body.type
  });

  genre.save()
    .then((result) => res.send(result))
    .catch((error) => res.send(error.message));
});


router.put('/:id', auth, (req, res) => {

  const result = validate(req.body);
  if(result.error)
    return res.status(400).send(result.error);

  Genre.findByIdAndUpdate(req.params.id, 
    { type: req.body.type}, {new : true, useFindAndModify: false})
    .then((genre) => res.send(genre))
    .catch((error) => res.send(error.message)); 
});


router.delete('/:id', [auth, admin,
  (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).send('Invalid id');
    }
    next();
  }, 
  (req, res) => {
  Genre.findByIdAndRemove(req.params.id)
    .then((result) => res.send(result))
    .catch((error) => res.send(error.message));
}]);

module.exports = router;