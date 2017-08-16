const Stock = require('../models/Stock');

module.exports = (req, res) => {
  const name = req.body.stockName;
  const symbol = req.body.stockSymbol;

  Stock.createStock(name, symbol, (err, stock) => {
    if (err) {
      res.json({success: false, msg: `Error while adding stock: ${err}`, statusCode: 1});
    } else if (stock) {
      res.json({success: true, msg: `Stock added`, statusCode: 0, stock: stock});
    } else {
      res.json({success: false, msg: `Error: Nothing happened`, statusCode: 1});
    }
  });
};
