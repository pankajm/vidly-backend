const mongoose = require('mongoose');
const logger = require('./logging').logger;
const config = require('config');
const redis = require('redis');


const client = redis.createClient(config.get('redisserver'));
          
client.on('connect', function() {
    console.log('Redis client connected');
});

client.on('error', function (err) {
  console.log('Something went wrong ' + err);
});

module.exports.connectDB = function(){
  const db = config.get('db');
  mongoose.connect(db, { useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex: true})
  .then(() => logger.info(`connected to ${db}...`));
}

module.exports.redisClient = client;