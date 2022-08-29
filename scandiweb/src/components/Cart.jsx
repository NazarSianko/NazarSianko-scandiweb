import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/cart.scss';
import Cartitem from './Cartitem';
import {  store } from '../redux/store';
import { plusCartItem } from '../redux/actions/cart';

 class Cart extends Component {
  plusItem = (id) => {

    store.dispatch(plusCartItem(id))
  }
  render() {
  console.log(this.props)
  const {items} = this.props
  const pizzas = Object.keys(items).map((key) => {
    return items[key].items[0];
  });
    return (
      <main className="cart-main">
        <h1 className="cart-title">CART</h1>
        <div className="cart-items">
          {pizzas? pizzas.map(el => <Cartitem  id = {el.id} price = {el.price} brand = {el.brand} name = {el.name} image={el.image} itemsCount={items[el.id].items.length} plusItem ={this.plusItem} />) : ''}
         
        </div>
      </main>
    );
  }
}
const mapStateToProps = state => ({
  items: state.cart.items,
  totalCount: state.cart.totalCount
});
export default connect(mapStateToProps)(Cart);