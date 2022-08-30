import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/cart.scss';
import Cartitem from './Cartitem';
import { store } from '../redux/store';
import { plusCartItem, minusCartItem, deleteCartItem, clearCart } from '../redux/actions/cart';

class Cart extends Component {
  plusItem = (id) => {
    store.dispatch(plusCartItem(id));
  };
  minusItem = (id) => {
    store.dispatch(minusCartItem(id));
  };
  deleteItem = (id) => {
    store.dispatch(deleteCartItem(id));
  };
  onClearCart = () => {
    if (window.confirm("Do you really want to clear Cart ?")) {
      store.dispatch(clearCart())
    }
   
 
  };
  render() {
   
    const { items } = this.props;
    const pizzas = Object.keys(items).map((key) => {
      return items[key].items[0];
    });
    return (
      <main className="cart-main">
        <h1 className="cart-title">CART</h1>
        <div className="cart-clear" onClick={this.onClearCart}>
          <img src="./trash.svg"></img>
          <span>Clear cart</span>
        </div>
        <div className="cart-items">
          {pizzas
            ? pizzas.map((el) => (
                <Cartitem
                  id={el.id}
                  price={el.price}
                  brand={el.brand}
                  name={el.name}
                  image={el.image}
                  itemsCount={items[el.id].items.length}
                  plusItem={this.plusItem}
                  minusItem={this.minusItem}
                  deleteItem={this.deleteItem}
                  currencyIndex={this.props.currencyIndex}
                  attributes = {el.attributes}
                />
              ))
            : ''}
        </div>
      </main>
    );
  }
}
const mapStateToProps = (state) => ({
  items: state.cart.items,
  totalCount: state.cart.totalCount,
});
export default connect(mapStateToProps)(Cart);
