const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const {
  getUsers,
  getUserById,
  getCurrentUser,
  // createUser,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');

function validateUrl(string) {
  if (!validator.isURL(string)) {
    throw new Error('Invalid URL');
  }
  return string;
}

const authValidation = Joi.object()
  .keys({
    authorization: Joi.string().required(),
  })
  .unknown(true);

const userIdValidation = Joi.object().keys({
  userId: Joi.string().hex().length(24),
});

router.get(
  '/',
  celebrate({
    headers: authValidation,
  }),
  getUsers
);

router.get(
  '/me',
  celebrate({
    headers: authValidation,
  }),
  getCurrentUser
);

router.get(
  '/:userId',
  celebrate({
    params: userIdValidation,
    headers: authValidation,
  }),
  getUserById
);

router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
    headers: authValidation,
  }),
  updateUser
);

router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().custom(validateUrl),
    }),
    headers: authValidation,
  }),
  updateUserAvatar
);

module.exports = router;
