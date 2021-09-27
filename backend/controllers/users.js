// this controller uses if statements to catch null values

const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: `Server Error: ${err}` }));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Invalid userId' });
      }
      return res.status(500).send({ message: `Server Error: ${err}` });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const errors = Object.keys(err.errors);
        const isMultiple = errors.length > 1;
        const lastError = errors.pop();

        return res.status(400).send({
          // response: 'Invalid name input' or 'Invalid name, about, and avatar inputs'
          message: `Invalid ${
            isMultiple
              ? // separate multiple error sources with commas and 'and'
                `${errors.join(', ')}${
                  // account for oxford comma
                  errors.length > 1 ? ',' : ''
                } and ${lastError}`
              : // or display solitary error sources with no added characters
                lastError
            // account for plurality at the end of message
          } input${isMultiple ? 's' : ''}`,
        });
      }
      return res.status(500).send({ message: `Server Error: ${err}` });
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
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
        return res.status(404).send({ message: 'User not found' });
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Invalid userId' });
      }
      if (err.name === 'ValidationError') {
        const errors = Object.keys(err.errors);
        return res.status(400).send({
          message: `Invalid ${errors.join(' and ')} input${
            errors.length > 1 ? 's' : ''
          }`,
        });
      }
      return res.status(500).send({ message: `Server Error: ${err}` });
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
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
        return res.status(404).send({ message: 'User not found' });
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Invalid userId' });
      }
      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Invalid avatar input',
        });
      }
      return res.status(500).send({ message: `Server Error: ${err}` });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
};
