const request = require('request');
const apiKey = require('../config').config.apiKey;
// const yelpAuthToken = process.env.YELP_TOKEN || require ('../../secrets.js').yelpToken;

module.exports = (req, res) => {
  const symbol = req.params.symbol;

  let now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let date = now.getDate();

  const url = `https://www.quandl.com/api/v3/datasets/WIKI/${symbol}.json`;
  const apiKeyParam = `?api_key=${apiKey}`;
  const dateParams = `&start_date=${year - 1}-${month}-${date}&end_date=${year}-${month}-${date}`;
  const sortParam = `&order=asc`;
  const limitParams = `&column_index=4`;

  const completeUrl = `${url}${apiKeyParam}${dateParams}${sortParam}${limitParams}`;

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
