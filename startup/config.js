const config = require('config');
const logger = require('./logging').logger;

module.exports = function () {
  if(!config.get('jwtPrivateKey')){
    throw new Error('FATAL : private key is not defined');
  }
}