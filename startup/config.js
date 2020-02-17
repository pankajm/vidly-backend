const config = require('config');

module.exports = function () {
  if(!config.get('jwtPrivateKey')){
    throw new Error('FATAL : private key is not defined');
  }
}