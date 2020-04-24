const config = require('config');

module.exports = function () {
  if(!config.get('vidly_jwtPrivateKey')){
    throw new Error('FATAL : private key is not defined');
  }
}