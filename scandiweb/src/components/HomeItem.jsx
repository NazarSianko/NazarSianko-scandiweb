import React, { Component } from 'react';
import ProductDescription from './ProductDescription';

export default class HomeItem extends Component {
  constructor(props) {
    super(props);
    this.setState = {
      descriptionFlag: true,
    };
  }

  render() {
    const { name, gallery, price, id } = this.props;

    return (
      <div className="showcase-main-item" onClick={() => this.props.setCurrentId(this.props.id)}>
        <div className="main-item-img">
          <img src={gallery[0]} alt="product"></img>
        </div>
        <div className="main-item-description">{name}</div>
        <div className="main-item-price">
          {price[this.props.currencyIndex].currency.symbol +
            ' ' +
            price[this.props.currencyIndex].amount}
        </div>
        <button className="main-item-btn">
          <img src="./Empty-white-Cart.png" alt=""></img>
        </button>
      </div>
    );
  }
}
