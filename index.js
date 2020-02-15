const config = require('config');
const express = require('express');
const morgan = require('morgan');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const app = express();
const logger = require('./models/winston');
require('./startup/routes')(app);
require('./startup/database')();

const port = process.env.PORT || 3000;

if(!config.get('jwtPrivateKey')){
  console.error('FATAL: private key is not defined');
  process.exit(1);
}

app.listen(port, () => console.log(`Listening on port ${port}`));

if(app.get('env') === 'development'){
  app.use(morgan('tiny'));
  console.log('morgan enabled...');
}

process.on('uncaughtException', function(ex){
  logger.error(ex);
})

process.on('unhandledRejection', function(ex){
  logger.error(ex);
  process.exit(1);
})