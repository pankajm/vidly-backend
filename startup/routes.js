const express = require('express');
const genres = require('../routes/genres');
const customers = require('../routes/customers');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const login = require('../routes/login');
const logout = require('../routes/logout');
const error = require('../middleware/error');
const morgan = require('morgan');
const logger = require('./logging').logger;


module.exports = function(app){

  if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    logger.info('morgan enabled');
  }
  app.use(express.json());
  app.use('/api/genres', genres);
  app.use('/api/customers', customers);
  app.use('/api/movies', movies);
  app.use('/api/rentals', rentals);
  app.use('/api/users', users);
  app.use('/api/login', login);
  app.use('/api/logout', logout);
  app.use(error);
  
}