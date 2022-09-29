import React, { PureComponent } from 'react';

export default class NullProduct extends PureComponent {
  render() {
    return (
      <div className="not-found-product">
        <div className="not-found-product-title">Product not found</div>;
      </div>
    );
  }
}
