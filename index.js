const config = require('config');
const express = require('express');
const logger = require('./middleware/logger');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const app = express();
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');


const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(express.json());
app.use(logger);

mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex: true},
  () => console.log('connected to vidly database...'));

if(app.get('env') === 'development'){
  app.use(morgan('tiny'));
  console.log('morgan enabled...');
}

app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);



// console.log(`Details - 1. ${config.get('name')} 
//           2. ${config.get('server.host')}
//           3. ${config.get('server.password')}`);
