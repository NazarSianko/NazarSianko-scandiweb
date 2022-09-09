import React, { Component } from "react";
import { connect } from "react-redux";
import "../styles/cart.scss";
import CartItem from "./CartItem";

import { plusCartItem, minusCartItem, deleteCartItem, clearCart } from "../redux/actions/cart";
import Overlay from "./Overlay";

class Cart extends Component {
 
  onClearCart = () => {
    if (window.confirm("Do you really want to clear Cart ?")) {
      this.props.clearCart();
    }
  };
  getTotalPrice = (items, index) =>
    Object.values(items)
      .map((obj) => obj.items)
      .flat()
      .reduce((sum, obj) => obj.price[index].amount + sum, 0);
  render() {
    const { items, currIndex } = this.props;
    const products = Object.keys(items).map((key) => {
      return items[key].items[0];
    });
   
    return (
      <main className="cart-main">
        {this.props.overlayFlag ? <Overlay /> : ""}
        <h1 className="cart-title">CART</h1>
        <div className="cart-clear" onClick={this.onClearCart}>
          <img src="./trash.svg"></img>
          <span>Clear cart</span>
        </div>
        <div className="cart-items">
          {products
            ? products.map((el) => (
                <CartItem
                  key = {el.id}
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
                  setActiveClass={this.props.setActiveClass}
                  items={this.products}
                />
              ))
            : ""}
        </div>
        <div className="total-check">
          <div className="tax">
            Tax 21%:<span>{` ${
              products.length > 0 ? products[0].price[currIndex].currency.symbol : ""
            } ${((this.getTotalPrice(items, currIndex)/100)*21).toFixed(2)} `}</span> 
          </div>
          <div className="Quantity">
            Quantity:<span className="quantity-span"> {this.props.totalCount}</span>
          </div>
          <div className="total">
            Total:
            <span>{` ${
              products.length > 0 ? products[0].price[currIndex].currency.symbol : ""
            } ${this.getTotalPrice(items, currIndex).toFixed(2)} `}</span>
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
const mapDispatchToProps = (dispatch) =>  ({


  
  plusItem: (objState) => dispatch(plusCartItem(objState)),
  minusItem: (objState) => dispatch(minusCartItem(objState)),
  deleteItem: (objState) => dispatch(deleteCartItem(objState)),
  clearCart: () => dispatch(clearCart())
})
export default connect(mapStateToProps,mapDispatchToProps)(Cart);
