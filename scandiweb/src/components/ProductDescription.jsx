import React, { Component } from 'react';
import '../styles/pdp.scss';
export default class ProductDescription extends Component {
  constructor(props) {
    super(props);
  }
  createMarkUp = () => ({
    __html: this.props.description,
  });
  render() {
    const { attributes, name, inStock, brand, description, gallery, price, loading } = this.props;
    console.log(attributes);
    return (
      <div className="pdp-main">
        <div className="pdp-cart">
          <div className="back-arrow" onClick={() => this.props.clearId()}>
            <img src="./back.png"></img>
          </div>
          <div className="pdp-left-imgs">
            {gallery.map((el, index) => (
              <div className="pdp-left-img">
                <img src={el} alt="small img"></img>
              </div>
            ))}
          </div>
          <div className="pdp-cart-main">
            <div className="cart-img">
              <img src={gallery[0]} alt="pdp img"></img>
            </div>

            <div className="cart-item_left">
              <div className="item-title">{name}</div>
              <div className="item-description">{brand}</div>

              {!loading
                ? attributes.map((el) => (
                    <div className="item-size">
                      <span className="size-text">
                        {el.name}
                        <br></br>
                      </span>
                      <div className="sizes">
                        {el.items.map((item) => (
                          <div
                            className="size"
                            style={{ background: `${el.name === 'Color' ? item.value : 'white'}` }}>
                            {el.name === 'Color' ? '' : item.value}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                : ''}
              <div className="item-price">
                <span className="price-text">PRICE:</span>
                <br></br>
                <span>
                  {price[this.props.currencyIndex].currency.symbol +
                    ' ' +
                    price[this.props.currencyIndex].amount}
                </span>
              </div>
              <button className="pdp-button">
                <span>ADD TO CART</span>
              </button>
              <div className="item-about">
                <span dangerouslySetInnerHTML={this.createMarkUp()}></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
