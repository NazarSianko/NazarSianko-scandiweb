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
      id: this.props.id,
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (!state.activeAttributes) {
      return {
        activeAttributes: props.data.product
          ? props.data.product.attributes.reduce((obj, el) => {
              obj[el.name] = 0;
              return obj;
            }, {})
          : '',
      };
    }
    return state;
  }

  setCartItem = () => {
    const obj = {
      id: this.props.data.product.id,
      price: this.props.data.product.prices,
      brand: this.props.data.product.brand,
      name: this.props.data.product.name,
      image: this.props.data.product.gallery,
      attributes: this.props.data.product.attributes,
      objState: this.state,
      setActiveClass: this.setActiveClass,
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
  /*setActiveClass = (id, index ,obj) => {
    return Object.keys(obj).find((keysItem) => keysItem == id) == id &&
      obj[id] == index &&
      id == 'Color'
      ? 'active-color'
      : Object.keys(obj).find((keysItem) => keysItem == id) == id &&
        obj[id] == index &&
        id !== 'Color'
      ? 'active'
      : '';
  };
*/

  render() {
    console.log(this.state);
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
                          className={
                            'size' +
                            ' ' +
                            `${this.props.setActiveClass(
                              el.id,
                              index,
                              this.state.activeAttributes,
                            )}`
                          }
                          style={{
                            background: `${el.name === 'Color' ? item.value : ''}`,
                            width: `${el.name === 'Color' ? '39px' : ''}`,
                            height: `${el.name === 'Color' ? '39px' : ''}`,
                          }}
                          onClick={() =>
                            this.setState((state) => ({
                              activeAttributes: {
                                ...state.activeAttributes,
                                [el.id]: index,
                              },
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
                    {this.props.data.product.prices[sessionStorage.getItem('currencyIndex') || 0]
                      .currency.symbol +
                      ' ' +
                      this.props.data.product.prices[sessionStorage.getItem('currencyIndex') || 0]
                        .amount}
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
