const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { getCards, createCard, deleteCard, likeCard, unlikeCard } = require('../controllers/cards');

function validateUrl(string) {
  if (!validator.isURL(string)) {
    throw new Error('Invalid URL');
  }
  return string;
}

const newCardValidation = Joi.object().keys({
  name: Joi.string().required().min(2).max(30),
  link: Joi.string().required().custom(validateUrl),
});

const authValidation = Joi.object()
  .keys({
    authorization: Joi.string().required(),
  })
  .unknown(true);

const cardIdValidation = Joi.object().keys({
  cardId: Joi.string().alphanum().length(24),
});

router.get(
  '/',
  celebrate({
    headers: authValidation,
  }),
  getCards
);

router.post(
  '/',
  celebrate({
    body: newCardValidation,
    headers: authValidation,
  }),
  createCard
);

router.delete(
  '/:cardId',
  celebrate({
    params: cardIdValidation,
    headers: authValidation,
  }),
  deleteCard
);

router.put(
  '/:cardId/likes',
  celebrate({
    params: cardIdValidation,
    headers: authValidation,
  }),
  likeCard
);

router.delete(
  '/:cardId/likes',
  celebrate({
    params: cardIdValidation,
    headers: authValidation,
  }),
  unlikeCard
);

module.exports = router;
