const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi'); // Input validator

const genres = [
  {id: 1, type: 'action'},
  {id: 2, type: 'horror'},
  {id: 3, type: 'romantic'},
  {id: 4, type: 'thriller'}
]

function validate(body, schema){             // Validate input using
  const joiSchema = Joi.object(schema);
  const result =  joiSchema.validate(body);
  return result;
}

router.get('/', (req, res) => {
  res.send(genres);
})


router.get('/:id', (req, res) => {
  const genre = genres.find((genre) =>
    genre.id === parseInt(req.params.id)
  );
  if(!genre)
    return res.status(404).send('No record found');

  return res.send(genre);
});


router.post('/', (req, res) => {
  const schema = { 
    type: Joi.string().required()
  };
  const result = validate(req.body, schema);
  if(result.error)
    return res.status(400).send(result.error);

  const genre = {id: genres.length + 1, type: req.body.type};
  genres.push(genre);

  return res.send(genre);
});


router.put('/:id', (req, res) => {
  const schema = { 
    type: Joi.string().required()
  };
  const result = validate(req.body, schema);
  if(result.error)
    return res.status(400).send(result.error);

  const genre = genres.find((genre) =>
    genre.id === parseInt(req.params.id)
  );
  if(!genre)
    return res.status(404).send('No record found');
  genre.type = req.body.type;

  return res.send(genre);
});

router.delete('/:id', (req, res) => {
  const genre = genres.find(genre => genre.id === parseInt(req.params.id));
  if(!genre)
    return res.status(404).send('No record found');

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  return res.send(genre);
});

module.exports = router;