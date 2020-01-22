const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('@hapi/joi'); // Input validator

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


router.get('/', (req, res) => {
  Genre.find()
    .then((result) => res.send(result))
    .catch((error) => res.send(error.message));
})


router.get('/:id', (req, res) => {
  Genre.findById(req.params.id)
    .then((genre) => res.send(genre))
    .catch((error) => res.send(error.message));
});


router.post('/', (req, res) => {
  const schema = { 
    type: Joi.string().required()
  };
  const result = validate(req.body, schema);
  if(result.error)
    return res.status(400).send(result.error);

  const genre = new Genre({
    type: req.body.type
  });

  genre.save()
    .then((result) => res.send(result))
    .catch((error) => res.send(error.message));
});


router.put('/:id', (req, res) => {
  const schema = { 
    type: Joi.string().required()
  };
  const result = validate(req.body, schema);
  if(result.error)
    return res.status(400).send(result.error);

  Genre.findByIdAndUpdate(req.params.id, 
    { type: req.body.type}, {new : true, useFindAndModify: false})
    .then((genre) => res.send(genre))
    .catch((error) => res.send(error.message)); 
});


router.delete('/:id', (req, res) => {
  Genre.findByIdAndRemove(req.params.id)
    .then((result) => res.send(result))
    .catch((error) => res.send(error.message));
});

module.exports = router;