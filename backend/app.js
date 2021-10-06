const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
require('dotenv').config();
const rateLimit = require('express-rate-limit');

// routes
const cards = require('./routes/cards');
const users = require('./routes/users');
const notFound = require('./routes/notFound');
const signin = require('./routes/signin');
const signup = require('./routes/signup');

// middleware
const error = require('./middleware/error');
const auth = require('./middleware/auth');

const { requestLogger, errorLogger } = require('./middleware/logger');

const { PORT = 3000 } = process.env;
const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests have been made to the server, please try again later.',
});

mongoose.connect('mongodb://localhost:27017/aroundb', {});

app.use(helmet());
app.use(express.json());

app.use(cors());
app.options('*', cors());

// log requests
app.use(requestLogger);

// apply rate limit to all requests
app.use(limiter);
// temporary crash test
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.use('/signin', signin);
app.use('/signup', signup);

app.use(auth);

app.use('/cards', cards);
app.use('/users', users);

// logs
app.use(errorLogger);

// celebrate
app.use(errors());

app.use('*', notFound);
// middleware
app.use(error);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
