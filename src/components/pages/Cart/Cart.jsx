import React, { PureComponent} from 'react';
import { connect } from 'react-redux';
import '../../../styles/cart.scss';
import CartItem from './CartItem';
import { getTotalPrice } from '../../../util/getTotalPrice';
import {
  plusCartItem,
  minusCartItem,
  deleteCartItem,
  clearCart,
} from '../../../redux/actions/cart';
import Overlay from '../../Overlay';
import { changeOverlayFlag } from '../../../redux/actions/overlay';

class Cart extends PureComponent {
  onClearCart = () => {
    if (window.confirm('Do you really want to clear Cart ?')) {
      this.props.clearCart();
    }
  };

  render() {
    const { items, currIndex } = this.props;
    const products = Object.keys(items).map((key) => {
      return items[key].items[0];
    });

    return (
      <main className="cart-main">
        {this.props.overlayFlag ? <Overlay /> : ''}
        <h1 className="cart-title">CART</h1>
        <div className="cart-clear" onClick={this.onClearCart}>
          <img src="./trash.svg" alt="trash-img"></img>
          <span>Clear cart</span>
        </div>
        <div className="cart-items">
          {products
            ? products.map((el) => (
                <CartItem
                  key={JSON.stringify(el.objState)}
                  id={el.id}
                  price={el.price}
                  brand={el.brand}
                  name={el.name}
                  image={el.image}
                  itemsCount={items[JSON.stringify(el.objState)].items.length}
                  plusItem={this.props.plusItem}
                  minusItem={this.props.minusItem}
                  deleteItem={this.props.deleteItem}
                  attributes={el.attributes}
                  state={el.objState}
                  items={this.products}
                />
              ))
            : ''}
        </div>
        <div className="cart-check">
          <div className="total-check">
            <div className="check-description">
              <div className="tax">Tax 21%:</div>
              <div className="Quantity">Quantity:</div>
              <div className="total">Total:</div>
            </div>
            <div className="check-value">
              <span>{` ${
                products.length > 0 ? products[0].price[currIndex].currency.symbol : ''
              } ${((getTotalPrice(items, currIndex) / 100) * 21).toFixed(2)} `}</span>
              <span>{this.props.totalCount}</span>
              <span>{` ${
                products.length > 0 ? products[0].price[currIndex].currency.symbol : ''
              } ${getTotalPrice(items, currIndex).toFixed(2)} `}</span>
            </div>
          </div>
          <button className="order">
            <span>ORDER</span>
          </button>
        </div>
      </main>
    );
  }
}
const mapStateToProps = (state) => ({
  items: state.cart.items,
  totalCount: state.cart.totalCount,
  overlayFlag: state.overlay.flag,
  currIndex: state.currency.index,
});
const mapDispatchToProps = (dispatch) => ({
  plusItem: (objState) => dispatch(plusCartItem(objState)),
  minusItem: (objState) => dispatch(minusCartItem(objState)),
  deleteItem: (objState) => dispatch(deleteCartItem(objState)),
  clearCart: () => dispatch(clearCart()),
  setOverlayFlag: (flag) => dispatch(changeOverlayFlag(flag)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
