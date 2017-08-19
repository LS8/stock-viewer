const config = {
  mongoAddress: process.env.MONGOLAB_URI || 'mongodb://localhost:27017/stockMarket',
  port: process.env.PORT || 8080,
  apiKey: process.env.QUANDL_KEY || require('./secrets.js').apiKey
};

module.exports = {
  config: config,
};
