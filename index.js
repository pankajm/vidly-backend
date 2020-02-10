const config = require('config');
const express = require('express');
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
const login = require('./routes/login');
const logout = require('./routes/logout');
const redis = require('redis');
const client = redis.createClient();


const port = process.env.PORT || 3000;

if(!config.get('jwtPrivateKey')){
  console.error('FATAL: private key is not defined');
  process.exit(1);
}

app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(express.json());

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
app.use('/api/login', login);
app.use('/api/logout', logout);





// console.log(`Details - 1. ${config.get('name')} 
//           2. ${config.get('server.host')}
//           3. ${config.get('server.password')}`);
