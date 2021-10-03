const jwt = require('jsonwebtoken');
const ErrorHandler = require('../helpers/error');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    // return res.status(401).send({ message: 'Authorization required' });
    // console.log('here');
    return next(new ErrorHandler(401, 'Authorization required'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, '3b60b8cecc1f5717043770b5861d3931b15a34063e5995aa16e1455b9afa506b');
  } catch (e) {
    next(new ErrorHandler(401, 'Authorization required'));
  }
  req.user = payload;
  return next();
};
