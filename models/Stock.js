// Track active stocks in MongoDb
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Use native promises
mongoose.Promise = global.Promise;

// Stock Schema
const StockSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  symbol: {
    type: String,
    required: true
  }
});

const Stock = module.exports = mongoose.model('Stock', StockSchema);

module.exports.createStock = function (name, symbol, callback) {
  let stock = new Stock({
    name: name,
    symbol: symbol
  }); 
  stock.save(callback);
};
