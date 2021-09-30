const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');
const cards = require('./routes/cards');
const users = require('./routes/users');
const error = require('./routes/error');
const { createUser, login } = require('./controllers/users');
const auth = require('./middleware/auth');

const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb', {
  // useNewUrlParser: true, // legacy since Mongoose 7.0
  // useCreateIndex: true, // legacy since Mongoose 7.0
  // useFindAndModify: false, // legacy since Mongoose 7.0
  // useUnifiedTopology: true, // legacy since Mongoose 7.0
});

app.use(helmet());
app.use(express.json());

app.use(cors());
app.options('*', cors());

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/cards', cards);
app.use('/users', users);

app.use(error);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
