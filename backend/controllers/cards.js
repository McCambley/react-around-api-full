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
    .then((card) => {
      return card.populate('owner');
    })
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
    // .populate({ path: 'owner', populate: { path: '_id' } })
    .then((card) => {
      if (!(card.owner.toString() === req.user._id)) {
        throw new ErrorHandler(403, 'Action forbidden');
      }
      // delete card if the above passes
      Card.findByIdAndDelete(req.params.cardId)
        .orFail()
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

// this controller uses orFail() to catch null values
// const ErrorHandler = require('../helpers/error');

// const Card = require('../models/card');

// const getCards = (req, res) => {
//   Card.find({})
//     .populate(['owner', 'likes'])
//     .sort('createdAt')
//     .then((cards) => {
//       res.send({ data: cards.reverse() });
//     })
//     .catch(next);
// };

// const createCard = (req, res) => {
//   const { name, link } = req.body;
//   Card.create({ name, link, owner: req.user._id })
//     // .populate('owner')
//     .then((card) => {
//       return card.populate('owner');
//     })
//     .then((card) => {
//       res.send({ data: card });
//     })
//     .catch((err) => {
//       if (err.name === 'ValidationError') {
//         const errors = Object.keys(err.errors);
//         return res.status(400).send({
//           message: `Invalid ${errors.join(' and ')} input${errors.length > 1 ? 's' : ''}`,
//         });
//       }
//       return res.status(500).send({ message: `Server Error: ${err}` });
//     });
// };

// const deleteCard = (req, res) => {
//   // find card
//   Card.findById(req.params.cardId)
//     // .populate({ path: 'owner', populate: { path: '_id' } })
//     .then((card) => {
//       if (!(card.owner.toString() === req.user._id)) {
//         return res.status(403).send({ message: 'Action forbidden' });
//       }
//       // delete card if the above passes
//       Card.findByIdAndDelete(req.params.cardId)
//         .orFail()
//         .then((card) => {
//           res.send({ data: card });
//         })
//         .catch((err) => {
//           if (err.name === 'CastError') {
//             return res.status(400).send({ message: 'Invalid CardId' });
//           }
//           if (err.name === 'DocumentNotFoundError') {
//             return res.status(404).send({ message: 'Card not found' });
//           }
//           return res.status(500).send({ message: `Server Error: ${err}` });
//         });
//     })
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         return res.status(400).send({ message: 'Invalid CardId' });
//       }
//       if (err.name === 'DocumentNotFoundError') {
//         return res.status(404).send({ message: 'Card not found' });
//       }
//       return res.status(500).send({ message: `Server Error: ${err}` });
//     });
// };

// const likeCard = (req, res) => {
//   Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
//     .orFail()
//     .populate('likes')
//     .then((card) => {
//       res.send({ data: card });
//     })
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         return res.status(400).send({ message: 'Invalid CardId' });
//       }
//       if (err.name === 'DocumentNotFoundError') {
//         return res.status(404).send({ message: 'Card not found' });
//       }
//       return res.status(500).send({ message: `Server Error: ${err}` });
//     });
// };

// const unlikeCard = (req, res) => {
//   Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
//     .orFail()
//     .then((card) => {
//       res.send({ data: card });
//     })
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         return res.status(400).send({ message: 'Invalid CardId' });
//       }
//       if (err.name === 'DocumentNotFoundError') {
//         return res.status(404).send({ message: 'Card not found' });
//       }
//       return res.status(500).send({ message: `Server Error: ${err}` });
//     });
// };

// module.exports = { getCards, createCard, deleteCard, likeCard, unlikeCard };
