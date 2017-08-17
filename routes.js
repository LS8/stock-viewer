const express = require('express');
const Router = express.Router();

// Controllers
const createStock = require('./controllers/createStock');
const deleteStock = require('./controllers/deleteStock');

Router.post('/', createStock);
Router.delete('/', deleteStock);

module.exports = Router;
