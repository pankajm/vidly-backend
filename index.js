const express = require('express');
const morgan = require('morgan');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const app = express();
require('./startup/logging').registerGlobalLogging();
require('./startup/routes')(app);
require('./startup/database')();
require('./startup/config')();

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));

if(app.get('env') === 'development'){
  app.use(morgan('tiny'));
  console.log('morgan enabled...');
}