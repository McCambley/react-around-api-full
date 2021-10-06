const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ErrorHandler = require('../helpers/error');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new ErrorHandler(404, 'User not found');
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ErrorHandler(400, 'Invalid userId'));
      }
      return next(err);
    });
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new ErrorHandler(404, 'User not found');
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ErrorHandler(400, 'Invalid userId'));
      }
      return next(err);
    });
};

const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, about, avatar, email, password: hash }))
    .then((user) => {
      res.status(201).send({
        data: { name: user.name, email: user.email, about: user.about, avatar: user.avatar },
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const errors = Object.keys(err.errors);
        const isMultiple = errors.length > 1;
        const lastError = errors.pop();

        return next(
          new ErrorHandler(
            400,
            `Invalid ${
              isMultiple
                ? // separate multiple error sources with commas and 'and'
                  `${errors.join(', ')}${
                    // account for oxford comma
                    errors.length > 1 ? ',' : ''
                  } and ${lastError}`
                : // or display solitary error sources with no added characters
                  lastError
              // account for plurality at the end of message
            } input${isMultiple ? 's' : ''}`
          )
        );
      }
      if (err.code === 11000) {
        return next(new ErrorHandler(409, 'Conflict'));
      }
      return next(err);
    });
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    // req.user_id is set during authorization
    req.user._id, // id of user to update
    {
      // new information to pass
      name,
      about,
    },
    {
      new: true, // return updated user
      runValidators: true, // validate inputs before update
    }
  )
    .then((user) => {
      if (!user) {
        throw new ErrorHandler(404, 'User not found');
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ErrorHandler(400, 'Invalid userId'));
      }
      if (err.name === 'ValidationError') {
        const errors = Object.keys(err.errors);
        return next(
          new ErrorHandler(
            400,
            `Invalid ${errors.join(' and ')} input${errors.length > 1 ? 's' : ''}`
          )
        );
      }
      return next(err);
    });
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    // req.user_id is set during authorization
    req.user._id, // id of user to update
    {
      avatar, // new information to pass
    },
    {
      new: true, // return updated user
      runValidators: true, // validate inputs before update
    }
  )
    .then((user) => {
      if (!user) {
        throw new ErrorHandler(404, 'User not found');
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ErrorHandler(400, 'Invalid userId'));
      }
      if (err.name === 'ValidationError') {
        return next(new ErrorHandler(400, 'Invalid avatar input'));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  // check if the user exists
  return User.findUserByCredentials(email, password)
    .then((user) => {
      // if it matches, return the JWT that parses the ID
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' }
      );
      res.send({ token });
    })
    .catch((err) => next(new ErrorHandler(401, err.message)));
};

module.exports = {
  getUsers,
  getUserById,
  getCurrentUser,
  createUser,
  updateUser,
  updateUserAvatar,
  login,
};
