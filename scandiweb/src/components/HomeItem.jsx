import React, { Component } from 'react';

export default class HomeItem extends Component {
  constructor(props) {
    super(props);
    
  }
  
  render() {
    const { id, name, inStock, brand, description, gallery, price } = this.props;

    return (
      <div className="showcase-main-item">
        <div className="main-item-img">
          <img src={gallery[0]} alt="product"></img>
        </div>
        <div className="main-item-description">{name}</div>
        <div className="main-item-price">{price[this.props.currencyIndex].currency.symbol + ' ' + price[this.props.currencyIndex].amount}</div>
        <button className="main-item-btn">
          <img src="./Empty-white-Cart.png" alt=""></img>
        </button>
      </div>
    );
  }
}
