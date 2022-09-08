import React, { Component } from 'react';

import { persistor, store } from '../redux/store';
import { addItem } from '../redux/actions/cart';
import { setId } from '../redux/actions/currentId';
import { connect } from 'react-redux';

class HomeItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static getDerivedStateFromProps(props, state) {
    if (!state.activeAttributes) {
      return {
        activeAttributes:
          props.attributes.length == 0
            ? { id: props.id }
            : props.attributes.reduce((obj, el) => {
                obj[el.name] = 0;
                obj.id = props.id;
                return obj;
              }, {}),
      };
    }
    return state;
  }
 

  setCartItem = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const obj = {
      id: this.props.id,
      price: this.props.price,
      brand: this.props.brand,
      name: this.props.name,
      image: this.props.gallery,
      attributes: this.props.attributes,

      objState: this.state.activeAttributes,
    };
    this.props.addItem(obj);
  };
  render() {
    const { name, gallery, price, id, brand, inStock } = this.props;
 
    return (
      <div
        className={'showcase-main-item' + ' ' + `${!inStock ? 'out' : ''}`}
        onClick={() => this.props.setCurrentId(id)}>
        <div className="main-item-img">
          <img src={gallery[0]} alt="product"></img>
        </div>
        <div className="main-item-description">{`${brand} ${name}`}</div>
        <div className="main-item-price">
          {price[this.props.currIndex].currency.symbol + ' ' + price[this.props.currIndex].amount}
        </div>

        <button className="main-item-btn" onClick={this.setCartItem}>
          <img src="./Empty-white-Cart.png" alt=""></img>
        </button>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  currIndex: state.currency.index,
});
const mapDispatchToProps=(dispatch) => ({
  setCurrentId: (id) => dispatch(setId(id)),
  addItem: (obj) => dispatch(addItem(obj)),
});
export default connect(mapStateToProps,mapDispatchToProps)(HomeItem);
