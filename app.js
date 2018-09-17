const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const errorHandler = (error, request, response, next) => {
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
