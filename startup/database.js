const mongoose = require('mongoose');
const logger = require('./logging').logger;
const config = require('config');

module.exports = function(){
  const db = config.get('db');
  mongoose.connect(db, { useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex: true})
  .then(() => logger.info(`connected to ${db}...`));
}