const logger = require('../models/winston');

module.exports = (err, req, res, next) => {
  logger.error({
    message : err.message
  });
  return res.status(500).send(err);
}