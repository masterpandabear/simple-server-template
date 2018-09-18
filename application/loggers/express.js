const { createLogger, transports } = require('winston');
const expressWinston = require('express-winston');
const format = require('./log-format');

const consoleTransport = new transports.Console();

const logger = createLogger({
  transports: [consoleTransport],
  format,
});

const loggerExpressWinston = {
  transports: [consoleTransport],
  expressFormat: true,
  meta: false,
  colorize: true,
  winstonInstance: logger,
};

module.exports = expressWinston.logger(loggerExpressWinston);
