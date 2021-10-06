const ErrorHandler = require('../helpers/error');

const notFound = (req, res, next) => {
  next(new ErrorHandler(404, 'Requested resource not found'));
};

module.exports = { notFound };
