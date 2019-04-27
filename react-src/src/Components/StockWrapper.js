import React, {Component} from 'react';
const ReactHighstock = require('react-highcharts/ReactHighstock');

class StockWrapper extends Component {

  componentDidMount() {
    // eslint-disable-next-line
    const chart = this.refs.chart.getChart();
    console.log("mount")
    console.log(this.props)
    this.props.getRef(chart);
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
  let { refName, config } = this.props;
  return (
      <ReactHighstock ref={refName} config={config}></ReactHighstock>
  );
  }
}

export default StockWrapper;

