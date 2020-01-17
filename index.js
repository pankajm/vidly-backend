const config = require('config');
const express = require('express');
const logger = require('./logger');
const Joi = require('@hapi/joi'); // Input validator
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(express.json());
app.use(logger);

if(app.get('env') === 'development'){
  app.use(morgan('tiny'));
  console.log('morgan enabled...');
}

console.log(`Details - 1. ${config.get('name')} 
          2. ${config.get('server.host')}
          3. ${config.get('server.password')}`);

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


app.get('/api/genres', (req, res) => {
  res.send(genres);
})


app.get('/api/genres/:id', (req, res) => {
  const genre = genres.find((genre) =>
    genre.id === parseInt(req.params.id)
  );
  if(!genre)
    return res.status(404).send('No record found');

  return res.send(genre);
});


app.post('/api/genres', (req, res) => {
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


app.put('/api/genres/:id', (req, res) => {
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

app.delete('/api/genres/:id', (req, res) => {
  const genre = genres.find(genre => genre.id === parseInt(req.params.id));
  if(!genre)
    return res.status(404).send('No record found');

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  return res.send(genre);
});