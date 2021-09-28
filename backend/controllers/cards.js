// this controller uses orFail() to catch null values

const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch((err) => {
      res.status(500).send({ message: `Server Error: ${err}` });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const errors = Object.keys(err.errors);
        return res.status(400).send({
          message: `Invalid ${errors.join(' and ')} input${errors.length > 1 ? 's' : ''}`,
        });
      }
      return res.status(500).send({ message: `Server Error: ${err}` });
    });
};
const deleteCard = (req, res) => {
  // find card
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!(card.owner === req.user._id)) {
        return res.status(403).send({ message: 'Action forbidden' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Invalid CardId' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Card not found' });
      }
      return res.status(500).send({ message: `Server Error: ${err}` });
    });

  // delete card if the above passes
  Card.findByIdAndDelete(req.params.cardId)
    .orFail()
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Invalid CardId' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Card not found' });
      }
      return res.status(500).send({ message: `Server Error: ${err}` });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail()
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Invalid CardId' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Card not found' });
      }
      return res.status(500).send({ message: `Server Error: ${err}` });
    });
};

const unlikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail()
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Invalid CardId' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Card not found' });
      }
      return res.status(500).send({ message: `Server Error: ${err}` });
    });
};

module.exports = { getCards, createCard, deleteCard, likeCard, unlikeCard };
