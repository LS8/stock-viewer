const express = require('express');
const Router = express.Router();

// Controllers
const findStock = require('./controllers/findStock');
const createStock = require('./controllers/createStock');
const deleteStock = require('./controllers/deleteStock');

const fetchStock = require('./controllers/fetchStock');

Router.get('/', findStock);
Router.post('/', createStock);
Router.delete('/', deleteStock);
Router.get('/stock/:symbol', fetchStock);

module.exports = Router;
