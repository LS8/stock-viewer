const Stock = require('../models/Stock');

module.exports = (req, res) => {
  Stock.findAll((err, stocks) => {
    if (err) {
      res.json({success: false, msg: `Error while searching stocks: ${err}`, statusCode: 1});
    } else if (stocks) {
      res.json({success: true, msg: `Stocks found`, statusCode: 0, stocks: stocks});
    } else {
      res.json({success: false, msg: `Error: Nothing happened`, statusCode: 1});
    }
  });
};
