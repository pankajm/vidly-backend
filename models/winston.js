const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;
require('winston-mongodb');

module.exports = createLogger({
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
  ]
});