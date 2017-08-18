import React, {Component} from 'react';
import axios from 'axios';
import StockWrapper from './StockWrapper';

const serverAddress = `http://localhost:8080/api`;

var chart;

const config = {
  series: []
};


class StockWrapperContainer extends Component {
  constructor() {
    super();

    this.getActiveStocks = this.getActiveStocks.bind(this);
    this.getStockData = this.getStockData.bind(this);
    this.addStockToState = this.addStockToState.bind(this);
    this.checkQuandlResponse = this.checkQuandlResponse.bind(this);
    this.addStockToDB = this.addStockToDB.bind(this);
    this.addStockToStateAndDB = this.addStockToStateAndDB.bind(this);
  }

  addStockToStateAndDB(stockData) {
    this.addStockToDB(stockData);
    this.addStockToState(stockData);
  }

  addStockToState(stockData, source) {

    if (source === "search") {
      this.addStockToDB(stockData);
    }

    const unixTimeAndData = stockData.data.map( (pair) => {
        let originalDate = pair[0];
        pair[0] = new Date(originalDate).getTime();
        return pair;
      });

    const stockSeries = {
      data: unixTimeAndData,
      description: stockData.name,
      name: stockData.dataset_code,
      id: stockData.id
    };

    config.series.push(stockSeries);
    chart.addSeries(config.series[config.series.length-1]);
  }

  addStockToDB(stockData) {
    const stockName = stockData.name;
    const stockSymbol = stockData.dataset_code;
    axios.post(`${serverAddress}/`, {stockName, stockSymbol})
      .then(() => {
        // console.log(response);
        // this.addStockToState(stockData);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getActiveStocks() {
    axios.get(`${serverAddress}/`)
      .then((response) => {
        let activeStocks = response.data.stocks;
        activeStocks.forEach( (stock) => {
          this.getStockData(stock.symbol, 'db');
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  getStockData(stockSymbol, source) { // queries quandl for stock data by stock symbol 
    // check if stock(symbol) is already present in state and abort if so
    if (keyAndPropPresent('name', stockSymbol, config.series)) {
      return;
    } else {
      axios.get(`${serverAddress}/quandl/${stockSymbol}`)
        .then((response) => {
          const res = response.data;
          const stockNotFound = this.checkQuandlResponse(res);
          if (res.success && !stockNotFound) {
            this.addStockToState(res.data.dataset, source);
          } else if (stockNotFound) {
            console.log(stockNotFound);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  checkQuandlResponse(response) {
    if (!response.success) {
      const msg = (response.data.quandl_error.code === 'QECx02')
                  ? "Please enter a valid Stock Symbol"
                  : "Sorry, no success while searching for this stock";
      return msg;
    } else {
      return false;
    }
  }
  
  componentWillMount() {
    // chart = this.refs.chart.getChart();
    this.getActiveStocks();
  }

  getRef(ref) {
    chart = ref;
    console.log(chart);
  }

  
  render() {
    return <StockWrapper getRef={this.getRef} refName="chart" addStock={this.getStockData} config={config} />;
  }
}

export default StockWrapperContainer;

function searchForProp (key, prop, array) {
  let found = null;
  for (let i = 0; i < array.length; i++) {
    let object = array[i];
    if (object[key] === prop) {
      found = prop;
    }
  }
  return found;
}

function keyAndPropPresent (key, prop, array) {
  const alreadyInArray = searchForProp(key, prop, array) ? true : false;
  return alreadyInArray;
}

