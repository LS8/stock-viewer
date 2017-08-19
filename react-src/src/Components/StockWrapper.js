import React, {Component} from 'react';
const ReactHighstock = require('react-highcharts/ReactHighstock');

class StockWrapper extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const chart = this.refs.chart.getChart();
    this.props.getRef(chart);
  }

  shouldComponentUpdate() {

    return false;

  }

  componentDidUpdate() {
    // const chart = this.refs.chart.getChart();
    // this.props.getRef(chart);
  }

  render() {
  let { refName, config } = this.props;
  return (
      <ReactHighstock ref={refName} config={config}></ReactHighstock>
  );
  }
}

export default StockWrapper;

