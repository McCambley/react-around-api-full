const jwt = require('jsonwebtoken');
const ErrorHandler = require('../helpers/error');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new ErrorHandler(401, 'Authorization required'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (e) {
    next(new ErrorHandler(401, 'Authorization required'));
  }
  req.user = payload;
  return next();
};
