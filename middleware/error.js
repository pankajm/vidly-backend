const logger = require('../startup/logging').logger;

module.exports = (err, req, res, next) => {
  logger.error(err.message, err);
  return res.status(500).send(err);
}