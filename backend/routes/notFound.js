const route = require('express').Router();
const { notFound } = require('../controllers/notFound');

route.use('/', notFound);

module.exports = route;
