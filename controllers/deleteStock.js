const Stock = require('../models/Stock');

module.exports = (req, res) => {
  const symbol = req.body.stockSymbol;

  Stock.deleteStock(symbol, (err) => {
    if (err) {
      res.json({success: false, msg: `Error while removing stock: ${err}`, statusCode: 1});
    } else {
      res.json({success: true, msg: `Stock deleted`, statusCode: 0});
    } 
  });
};
