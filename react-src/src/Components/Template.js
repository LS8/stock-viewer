import React from 'react';
import Header from './Header';
import Content from './Content';

const Template = () => {
  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <Content />
        </div>
      </div>
    </div>
  )
  ;
};

export default Template;
