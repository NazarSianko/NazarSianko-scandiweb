import React, { Component } from 'react';

export default class NullProduct extends Component {
  render() {
    return (
      <div className="null-product">
        <div className="null-product-title">Product not found</div>;
      </div>
    );
  }
}
