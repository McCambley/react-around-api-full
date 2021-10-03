const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const cards = require('./routes/cards');
const users = require('./routes/users');
const signin = require('./routes/signin');
const signup = require('./routes/signup');
// const error = require('./routes/error');
const error = require('./middleware/error');
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

app.use('/signin', signin);
app.use('/signup', signup);
// app.post('/signin', login);
// app.post('/signup', createUser);

app.use(auth);

app.use('/cards', cards);
app.use('/users', users);

// celebrate
app.use(errors());

// middleware
app.use(error);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
