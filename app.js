const express = require('express');
const { logger, expressLogger } = require('./application/loggers');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressLogger);

// eslint-disable-next-line no-unused-vars
const errorHandler = (error, request, response, next) => {
  logger.error(error);
  const statusCode = error.statusCode || 500;
  response.locals.message = error.message;
  response.locals.error = request.app.get('env') === 'development' ? error : {};
  const messageToReturn = error.message;
  response.status(statusCode);
  response.json({
    message: messageToReturn,
    code: error.code || error.errorCode,
  });
};

app.use((request, response, next) => {
  const error = new Error('Not found');
  error.statusCode = 404;
  next(error);
});

app.use(errorHandler);

module.exports = app;
