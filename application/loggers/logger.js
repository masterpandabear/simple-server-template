const { createLogger, transports } = require('winston');

const format = require('./log-format');

const level = process.env.LOGGER_LEVEL || 'info';
const consoleTransport = new transports.Console();

const loggerOptions = {
  level,
  transports: [consoleTransport],
  format,
};

const logger = createLogger(loggerOptions);

module.exports = logger;
