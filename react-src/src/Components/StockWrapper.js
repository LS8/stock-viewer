import React, {Component} from 'react';
import StockPanel from './StockPanel';
import SearchPanel from './SearchPanel';
const ReactHighstock = require('react-highcharts/ReactHighstock');



class StockWrapper extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const chart = this.refs.chart.getChart();
    this.props.getRef(chart);
  }

  render() {
  let { refName, config, series, addStock } = this.props;
  // let stocks = series;
  // console.log(stocks);
  return (
    <div>


      <ReactHighstock ref={refName} config={config}></ReactHighstock>

      <div className="panel-wrapper">
        <div className="col-sm-12 col-md-6 col-lg-4">
          <SearchPanel addStock={addStock} name="Add a stock"/>
        </div>
      </div>
    </div>
  );
  }
}

export default StockWrapper;
      // <button onClick={addDataSet}>Add airbnb</button>

        // { stocks.map( (stock) => {
        //   return (
        //     <div key={stock.id} className="col-sm-12 col-md-6 col-lg-4">
        //       <StockPanel description={stock.description} name={stock.name}/>
        //     </div>
        //   );
        // })}
