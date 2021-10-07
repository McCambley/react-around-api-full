// this controller uses orFail() to catch null values
const ErrorHandler = require('../helpers/error');

const Card = require('../models/card');

const getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .sort('createdAt')
    .then((cards) => {
      res.send({ data: cards.reverse() });
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    // .populate('owner')
    .then((card) => card.populate('owner'))
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
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

const deleteCard = (req, res, next) => {
  // find card
  Card.findById(req.params.cardId)
    .orFail()
    // .populate({ path: 'owner', populate: { path: '_id' } })
    .then((card) => {
      if (!(card.owner.toString() === req.user._id)) {
        throw new ErrorHandler(403, 'Action forbidden');
      }
      // delete card if the above passes
      Card.findByIdAndDelete(req.params.cardId)
        .orFail()
        .then((deletedCard) => {
          res.send({ data: deletedCard });
        })
        .catch((err) => {
          if (err.name === 'CastError') {
            return next(new ErrorHandler(400, 'Invalid CardId'));
          }
          if (err.name === 'DocumentNotFoundError') {
            return next(new ErrorHandler(404, 'Card not found'));
          }
          return next(err);
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ErrorHandler(400, 'Invalid CardId'));
      }
      if (err.name === 'DocumentNotFoundError') {
        return next(new ErrorHandler(404, 'Card not found'));
      }
      return next(err);
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail()
    .populate('likes')
    .populate('owner')
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ErrorHandler(400, 'Invalid CardId'));
      }
      if (err.name === 'DocumentNotFoundError') {
        return next(new ErrorHandler(404, 'Card not found'));
      }
      return next(err);
    });
};

const unlikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail()
    .populate('likes')
    .populate('owner')
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ErrorHandler(400, 'Invalid CardId'));
      }
      if (err.name === 'DocumentNotFoundError') {
        return next(new ErrorHandler(404, 'Card not found'));
      }
      return next(err);
    });
};

module.exports = { getCards, createCard, deleteCard, likeCard, unlikeCard };
