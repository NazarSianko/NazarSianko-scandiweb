import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import MiniCartItem from './MiniCartItem';
import { store } from '../redux/store';
import { plusCartItem, minusCartItem,deleteCartItem,clearCart } from '../redux/actions/cart';

import { NavLink } from 'react-router-dom';
import { changeOverlayFlag } from '../redux/actions/overlay';

class MiniCart extends Component {
  constructor(props) {
    super(props);

    this.overlayRef = createRef();
  }
  handleOutsideClick = (e) => {
    const pathInAllBrowsers = e.path || (e.composedPath && e.composedPath());
    if (!pathInAllBrowsers.includes(this.overlayRef.current)) {
      document.body.classList.remove('active');
     this.props.setOverlayFlag(false);
    }
  };
  onClearCart = () => {
    if (window.confirm('Do you really want to clear Cart ?')) {
      this.props.clearCart();
    }
  };
  getTotalPrice = (items, index) =>
    Object.values(items)
      .map((obj) => obj.items)
      .flat()
      .reduce((sum, obj) => obj.price[index].amount + sum, 0);
  setActiveOverlay = () => {
    store.dispatch(changeOverlayFlag(!this.props.flag));
    if (!this.props.flag) {
      document.body.classList.add('active');
    } else {
      document.body.classList.remove('active');
    }
  };
  componentDidMount = () => {
    document.addEventListener('click', this.handleOutsideClick); 
  };
  //знаю, что слушатели надо удалять, но не получилось, не срабатывает

  render() {
 
    const { items, currIndex } = this.props;
    const products = Object.keys(items).map((key) => {
      return items[key].items[0];
    });
    console.log(products)
    return (
      <div className="header-cart" ref={this.overlayRef}>
        <div className="cart" onClick={() => this.setActiveOverlay()}>
          <img className='header-cart-img' src="./Empty Cart.png"></img>
          {this.props.totalCount ? <div className="cart-counter">{this.props.totalCount}</div> : ''}
        </div>
        {this.props.flag ? (
          <div className="cart-overlay">
            <div className='overlay-header'>
            <div className="overlay-tittle">
              My Bag. <span className="overlay-quantity">{this.props.totalCount} items</span>
            </div>
            <div className="cart-clear" onClick={this.onClearCart}>
              <div className='trash-img'>
          <img src="./trash.svg"></img>
          </div>
          <span className='clear-cart'>Clear cart</span>
        </div>
        </div>
            {products
              ? products.map((el) => (
                  <MiniCartItem
                  key = {el.id}
                    id={el.id}
                    price={el.price}
                    brand={el.brand}
                    name={el.name}
                    image={el.image}
                    itemsCount={items[JSON.stringify(el.objState)].items.length}
                    plusItem={this.props.plusItem}
                    minusItem={this.props.minusItem}
                    deleteItem = {this.props.deleteItem}
                    
                    attributes={el.attributes}
                    state={el.objState}
                    setActiveClass={this.props.setActiveClass}
                  />
                ))
              : ''}
            <div className="overlay-total">
              <div className="total">Total</div>
              <div className="price">{` ${
                products.length > 0 ? products[0].price[this.props.currIndex].currency.symbol : ''
              } ${this.getTotalPrice(items, currIndex).toFixed(2)} `}</div>
            </div>
            <div className="overlay-btns">
              <NavLink to="/cart">
                <button className="view-btn" onClick={() => this.setActiveOverlay()}>
                  VIEW BAG
                </button>
              </NavLink>
              <button className="checkout-btn">CHECKOUT</button>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.cart.items,
  totalCount: state.cart.totalCount,
  currIndex: state.currency.index,
  totalCount: state.cart.totalCount,
  flag: state.overlay.flag,
});
const mapDispatchToProps = (dispatch) =>  ({


  
  plusItem: (objState) => dispatch(plusCartItem(objState)),
  minusItem: (objState) => dispatch(minusCartItem(objState)),
  setOverlayFlag: (flag) => dispatch(changeOverlayFlag(flag)),
  deleteItem: (objState) => dispatch(deleteCartItem(objState)),
  clearCart: () => dispatch(clearCart())
})
export default connect(mapStateToProps,mapDispatchToProps)(MiniCart);
