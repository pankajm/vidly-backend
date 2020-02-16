const mongoose = require('mongoose');
const logger = require('./logging').logger;

module.exports = function(){
  mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex: true})
  .then(() => logger.info('connected to vidly database...'));
}