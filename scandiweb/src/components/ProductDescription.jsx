import React, { Component } from 'react';
import '../styles/pdp.scss';
import { gql } from '@apollo/client';
import { NavLink } from 'react-router-dom';
import { graphql } from '@apollo/client/react/hoc';
import { persistor, store } from '../redux/store';
import { addItem } from '../redux/actions/cart';

class ProductDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgIndex: 0,
      currentId: '',
    };
  }
  setCartItem = () => {
    const obj = {
      id: this.props.data.product.id,
      price:  this.props.data.product.prices[this.props.currencyIndex].currency.symbol +
        ' ' +
        this.props.data.product.prices[this.props.currencyIndex].amount,
      brand: this.props.data.product.brand,
      name: this.props.data.product.name,
      image: this.props.data.product.gallery[0],

    };
    store.dispatch(addItem(obj));
 
  };
  setImageId = (index) => {
    this.setState({
      imgIndex: index,
    });
  };
  createMarkUp = () => ({
    __html: this.props.data.product ? this.props.data.product.description : '',
  });
  setActiveClass = (id, index) => {
    return Object.keys(this.state).find((keysItem) => keysItem == id) == id &&
      this.state[id] == index &&
      id == 'Color'
      ? 'active-color'
      : Object.keys(this.state).find((keysItem) => keysItem == id) == id &&
        this.state[id] == index &&
        id !== 'Color'
      ? 'active'
      : '';
  };

  render() {

    return (
      <div className="pdp-main">
        {!this.props.data.loading && !this.props.data.error ? (
          <div className="pdp-cart">
            <NavLink to="/">
              <div className="back-arrow">
                <img src="./back.png"></img>
              </div>
            </NavLink>
            <div className="pdp-left-imgs">
              {this.props.data.product.gallery.map((el, index) => (
                <div
                  className={
                    'pdp-left-img' + ' ' + `${this.state.imgIndex == index ? 'active-color' : ' '}`
                  }
                  onClick={() => this.setImageId(index)}>
                  <img src={el} alt="small img"></img>
                </div>
              ))}
            </div>
            <div className="pdp-cart-main">
              <div className="cart-img">
                <img src={this.props.data.product.gallery[this.state.imgIndex]} alt="pdp img"></img>
              </div>

              <div className="cart-item_left">
                <div className="item-title">{this.props.data.product.name}</div>
                <div className="item-description">{this.props.data.product.brand}</div>

                {this.props.data.product.attributes.map((el) => (
                  <div className="item-size">
                    <span className="size-text">
                      {el.name.toUpperCase() + ':'}
                      <br></br>
                    </span>
                    <div className="sizes">
                      {el.items.map((item, index) => (
                        <div
                          className={'size' + ' ' + `${this.setActiveClass(el.id, index)}`}
                          style={{
                            background: `${el.name === 'Color' ? item.value : ''}`,
                            width: `${el.name === 'Color' ? '39px' : ''}`,
                            height: `${el.name === 'Color' ? '39px' : ''}`,
                          }}
                          onClick={() =>
                            this.setState((state) => ({
                              ...state,
                              [el.id]: index,
                            }))
                          }>
                          {el.name === 'Color' ? '' : item.value}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="item-price">
                  <span className="price-text">PRICE:</span>
                  <br></br>
                  <span>
                    {this.props.data.product.prices[this.props.currencyIndex].currency.symbol +
                      ' ' +
                      this.props.data.product.prices[this.props.currencyIndex].amount}
                  </span>
                </div>
                <button className="pdp-button" onClick={() => this.setCartItem()}>
                  <span>ADD TO CART</span>
                </button>
                <div className="item-about">
                  <span dangerouslySetInnerHTML={this.createMarkUp()}></span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}
const CATEGORIES = gql`
  query CategoryQuery($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        id
        name
        type
        items {
          id
          displayValue
          value
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      brand
    }
  }
`;

export default graphql(CATEGORIES, {
  options: (props) => {
    return {
      variables: {
        id: props.id,
      },
    };
  },
})(ProductDescription);
