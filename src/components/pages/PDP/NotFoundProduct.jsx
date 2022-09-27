import React, { PureComponent } from 'react';

export default class NullProduct extends PureComponent {
  render() {
    return (
      <div className="null-product">
        <div className="null-product-title">Product not found</div>;
      </div>
    );
  }
}
