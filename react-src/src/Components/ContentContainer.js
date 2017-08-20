import React, {Component} from 'react';
import axios from 'axios';
import StockWrapper from './StockWrapper';
import PanelWrapper from './PanelWrapper';

const serverAddress = `http://localhost:8080/api`;

var chart;

const config = {
  navigator: {
    enabled: false
  },
  series: []
};


class StockWrapperContainer extends Component {
  constructor() {
    super();

    this.state = {
      stocks: []
    };

    this.addStock = this.addStock.bind(this);
    this.getActiveStocks = this.getActiveStocks.bind(this);
    this.getStockData = this.getStockData.bind(this);
    this.checkQuandlResponse = this.checkQuandlResponse.bind(this);
    this.saveToDb = this.saveToDb.bind(this);
  }

  addStock(stockData, source) {
    const description = stockData.name;
    const name        = stockData.dataset_code;
    const id          = stockData.id;
    const data        = stockData.data.map( (pair) => {
        pair[0] = new Date(pair[0]).getTime();
        return pair;
      });
    // stock is new and was not already in the db so it has to be saved to the db
    if (source === "search") {
      this.saveToDb(stockData);
    }
    // push stock representing object to the charts config series array
    config.series.push({ data, description, name, id });
    // add the last entry in the configs series array to the chart
    chart.addSeries(config.series[config.series.length-1]);
    // update state to include the new stock, resulting in triggering a re-render of the panels
    this.setState({ stocks: this.state.stocks.concat({ description, name, id }) });
  }

  saveToDb(stockData) {
    const stockName = stockData.name;
    const stockSymbol = stockData.dataset_code;
    axios.post(`${serverAddress}/`, {stockName, stockSymbol})
      .then(() => {
        // console.log(response);
        // this.addStock(stockData);
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
            this.addStock(res.data.dataset, source);
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
    this.getActiveStocks();
  }

  getRef(ref) {
    chart = ref;
  }
  
  render() {
    return (
      <div>
        <StockWrapper getRef={this.getRef} refName="chart" config={config} />;
        <PanelWrapper stocks={this.state.stocks} addStock={this.getStockData} />
      </div>
    );
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

