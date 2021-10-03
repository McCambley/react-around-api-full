const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { login } = require('../controllers/users');

function validateEmail(string) {
  if (!validator.isEmail(string)) {
    throw new Error('Invalid Email');
  }
  return string;
}

// const newUserValidation = Joi.object().keys({
//   name: Joi.string().required().min(2).max(30),
//   about: Joi.string().required().min(2).max(30),
//   avatar: Joi.string().required().custom(validateUrl),
//   email: Joi.string().required().custom(validateEmail),
//   password: Joi.string().min(8).required(),
// });

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().custom(validateEmail),
      password: Joi.string().min(8).required(),
    }),
  }),
  login
);

module.exports = router;
