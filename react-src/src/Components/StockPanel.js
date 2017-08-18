import React from 'react';

const StockPanel = ({name, description}) => {
  return (
    <div className="stock-panel panel panel-default">
      <div className="panel-heading">
        <h3 className="panel-title">{name}</h3>
      </div>
      <div className="panel-body">
        {description}
      </div>
    </div>
  );
};

export default StockPanel;
