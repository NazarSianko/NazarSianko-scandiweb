import React, { Component } from 'react';
import BackArrow from '../../BackArrow';

export default class NullProduct extends Component {
  render() {
    return (
      <div className="null-product">
        <BackArrow className={'back-arrow-null'} />
        <div className="null-product-title">Product not found</div>;
      </div>
    );
  }
}
