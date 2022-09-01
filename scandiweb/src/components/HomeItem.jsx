import React, { Component } from 'react';

import { persistor, store } from '../redux/store';
import { addItem } from '../redux/actions/cart';
import { NavLink } from 'react-router-dom';

export default class HomeItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static getDerivedStateFromProps(props, state) {
    if (!state.activeAttributes) {
      return {
        activeAttributes: props.attributes.reduce((obj, el) => {
          obj[el.name] = 0;
          return obj;
        }, {}),
      };
    }
    return state;
  }

  setCartItem = () => {
    const obj = {
      id: this.props.id,
      price: this.props.price,
      brand: this.props.brand,
      name: this.props.name,
      image: this.props.gallery,
      attributes: this.props.attributes,
      setActiveClass: this.props.setActiveClass,
      objState: this.state,
    };
    store.dispatch(addItem(obj));
  };
  render() {
    const { name, gallery, price, id, brand } = this.props;
  
    return (
       <div className="showcase-main-item" onClick={() => this.props.setCurrentId(this.props.id)}>
       <NavLink to={`/pdp/${this.props.id}`}>
        <div className="main-item-img">
          <img src={gallery[0]} alt="product"></img>
        </div>
        <div className="main-item-description">{`${brand} ${name}`}</div>
        <div className="main-item-price">
          {price[sessionStorage.getItem('currencyIndex') || 0].currency.symbol +
            ' ' +
            price[sessionStorage.getItem('currencyIndex') || 0].amount}
        </div>
        </NavLink>
        <button className="main-item-btn" onClick={this.setCartItem}>
          <img src="./Empty-white-Cart.png" alt=""></img>
        </button>
      </div>
    );
  }
}
