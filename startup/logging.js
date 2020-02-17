// const logger = require('../models/logger');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;
require('winston-mongodb');

function registerGlobalLogging () {
  
  process.on('uncaughtException', function(ex){
    logger.error(ex.message, ex);
  })

  process.on('unhandledRejection', async function(ex){
    logger.error(ex.message, ex);  
  })
}

const logger = createLogger ({
  format: combine(
    timestamp(),
    prettyPrint(),
    format.colorize()
  ),

  transports: [
    
    new transports.File({ 
      level: 'info',
      filename: 'logfile.log'
    }),
    new transports.Console({
      level:'error'
    }),
    new transports.MongoDB({
      db:'mongodb://localhost/vidly'
    })
  ],
  exitOnError : true
})


module.exports.registerGlobalLogging = registerGlobalLogging;
module.exports.logger = logger;

