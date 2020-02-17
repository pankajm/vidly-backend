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

  transports: [
    
    new transports.File({ 
      level: 'error',
      filename: 'logfile.log',
      format : combine(
        format.colorize(),
        timestamp(),
        prettyPrint()
      )
    }),

    new transports.Console({
      level:'info',
      format : combine(
        format.colorize(),
        format.simple()
      )
    }),

    new transports.MongoDB({
      level : 'error',
      db:'mongodb://localhost/vidly'
    })
  ]
})


module.exports.registerGlobalLogging = registerGlobalLogging;
module.exports.logger = logger;

