const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    required: true,
    type: String,
    // validation for links to avatar images
    validate: {
      validator(input) {
        return /https?:\/\/.*(\.com|\.photos|\.ly).*/gm.test(input);
      },
      message: (input) => `${input.value} is not a valid URL`,
    },
  },
});

module.exports = mongoose.model('user', userSchema);
