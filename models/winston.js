const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;

module.exports = createLogger({
  level: 'error',
  format: combine(
    timestamp(),
    prettyPrint(),
    format.colorize()
  ),
  
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log` 
    // - Write all logs error (and below) to `error.log`.
    //
    new transports.File({ filename: 'logfile.log'}),
    new transports.Console()
  ]
});