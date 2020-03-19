const express = require('express');
const app = express();
const logger = require('./startup/logging').logger;
require('./startup/logging').registerGlobalLogging();
require('./startup/routes')(app);
require('./startup/database')();
require('./startup/config')();
require('./startup/validation')();

const port = process.env.PORT || 3000;

const server = app.listen(port, () => logger.info(`Listening on port ${port}`));

module.exports = server;