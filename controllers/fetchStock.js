const request = require('request');
const apiKey = require('../config').config.apiKey;
// const yelpAuthToken = process.env.YELP_TOKEN || require ('../../secrets.js').yelpToken;

module.exports = (req, res) => {
  const symbol = req.params.symbol;

  let now = new Date();
  // let year = now.getFullYear();
  let year = 2018;
  let month = now.getMonth() + 1;
  let date = now.getDate();

  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full`
  const apiKeyParam = `&apikey=${apiKey}`;
  const completeUrl = `${url}${apiKeyParam}`;

  let headers = {
    'Content-Type': 'application/json',
    // 'Authorization': process.env.YELP_TOKEN || yelpAuthToken
  };

  let options = {
    url: completeUrl,
    method: 'GET',
    headers: headers
  };

  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.json({ success: true, msg: 'Successfully fetched', data: JSON.parse(body) });
    } else {
      res.json({ success: false, msg: 'Error while querying Quandl', data: JSON.parse(body) });
    }
  });
};
