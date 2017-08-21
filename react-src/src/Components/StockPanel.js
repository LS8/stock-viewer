import React from 'react';

const StockPanel = ({name, emit, description, removeStock}) => {
  return (
    <div className="stock-panel panel panel-default">
      <div className="panel-heading">
        <button onClick={ () => {
          emit(name);
          return removeStock(name) ;
        } } type="button" className="close" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <h3 className="panel-title">{name}</h3>
      </div>
      <div className="panel-body">
        {description}
      </div>
    </div>
  );
};

export default StockPanel;
