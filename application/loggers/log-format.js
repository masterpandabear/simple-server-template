const { format } = require('winston');

const {
  combine,
  printf,
  colorize,
  timestamp,
} = format;

const consoleFormat = printf(info => `${info.timestamp} ${info.level}: ${info.message}`);

module.exports = combine(
  colorize(),
  timestamp({ format: 'default' }),
  consoleFormat,
);
