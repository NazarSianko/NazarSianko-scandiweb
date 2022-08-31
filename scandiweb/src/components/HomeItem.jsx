import React, { Component } from 'react';
import session from 'redux-persist/lib/storage/session';
import ProductDescription from './ProductDescription';

export default class HomeItem extends Component {
  constructor(props) {
    super(props);
    this.setState = {
      descriptionFlag: true,
    };
  }

  render() {
    const { name, gallery, price, id,brand } = this.props;

    return (
      <div className="showcase-main-item" onClick={() => this.props.setCurrentId(this.props.id)}>
        <div className="main-item-img">
          <img src={gallery[0]} alt="product"></img>
        </div>
        <div className="main-item-description">{`${brand} ${name}`}</div>
        <div className="main-item-price">
          {price[sessionStorage.getItem('currencyIndex') || 0].currency.symbol +
            ' ' +
            price[sessionStorage.getItem('currencyIndex') || 0].amount}
        </div>
        <button className="main-item-btn">
          <img src="./Empty-white-Cart.png" alt=""></img>
        </button>
      </div>
    );
  }
}
