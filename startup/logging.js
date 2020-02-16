const logger = require('../models/winston');

module.exports = () => {
  
  process.on('uncaughtException', function(ex){
    logger.error(ex);
    process.exit(1);
  })

  process.on('unhandledRejection', function(ex){
    logger.error(ex);
    process.exit(1);
  })
}