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
