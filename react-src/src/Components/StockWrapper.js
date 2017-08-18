import React from 'react';
import StockPanel from './StockPanel';
import SearchPanel from './SearchPanel';
const ReactHighstock = require('react-highcharts/ReactHighstock');



const StockWrapper = (props) => {

  let { config, addStock } = props;
  let stocks = config.series;
  return (
    <div>


      <ReactHighstock config = {config}></ReactHighstock>

      <div className="panel-wrapper">
        <div className="col-sm-12 col-md-6 col-lg-4">
          <SearchPanel addStock={addStock} name="Add a stock"/>
        </div>
        { stocks.map( (stock) => {
          return (
            <div key={stock.id} className="col-sm-12 col-md-6 col-lg-4">
              <StockPanel description={stock.description} name={stock.name}/>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StockWrapper;
      // <button onClick={addDataSet}>Add airbnb</button>
