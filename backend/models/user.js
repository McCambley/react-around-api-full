const mongoose = require('mongoose');

const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Jacques Cousteau',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Explorer',
  },
  avatar: {
    type: String,
    // validation for links to avatar images
    validate: {
      validator(input) {
        return /https?:\/\/.*(\.com|\.photos|\.ly).*/gm.test(input);
      },
      message: (input) => `${input.value} is not a valid URL`,
    },
    default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
  },
  email: {
    required: true,
    type: String,
    unique: true,
    validate: {
      validator: validator.isEmail,
    },
  },
  password: {
    required: true,
    type: String,
    minlength: 8,
  },
});

module.exports = mongoose.model('user', userSchema);
