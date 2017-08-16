const express = require('express');
const Router = express.Router();

// Controllers
const createStock = require('./controllers/createStock');

Router.post('/', createStock);

module.exports = Router;
