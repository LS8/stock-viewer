import React from 'react';
import StockPanel from './StockPanel';
import SearchPanel from './SearchPanel';

const PanelWrapper = (props) => {
  const { removeStock, stocks, addStock } = props;
  return (
    <div className="panel-wrapper">
      <div className="col-sm-12 col-md-6 col-lg-4">
        <SearchPanel addStock={addStock} name="Add a stock"/>
      </div>
      { stocks && stocks.map( (stock) => {
        return (
          <div key={stock.id} className="col-sm-12 col-md-6 col-lg-4">
            <StockPanel removeStock={removeStock} description={stock.description} name={stock.name}/>
          </div>
        );
      })}
    </div>
  );
};

export default PanelWrapper;
