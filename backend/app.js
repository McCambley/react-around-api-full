const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cards = require('./routes/cards');
const users = require('./routes/users');
const error = require('./routes/error');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb', {
  // useNewUrlParser: true, // legacy since Mongoose 7.0
  // useCreateIndex: true, // legacy since Mongoose 7.0
  // useFindAndModify: false, // legacy since Mongoose 7.0
  // useUnifiedTopology: true, // legacy since Mongoose 7.0
});

app.use(helmet());
app.use(express.json());

// temporary authorization middleware
app.use((req, res, next) => {
  req.user = {
    _id: '613222538f037f837e9dfd68', // "Jake McCambley"
  };

  next();
});

app.use('/cards', cards);
app.use('/users', users);

app.use(error);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
