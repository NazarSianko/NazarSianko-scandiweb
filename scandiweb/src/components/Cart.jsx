import React, { Component } from 'react';

export default class Cart extends Component {
  render() {
    return (
      <main className="cart-main">
        <h1 className="cart-title">CART</h1>
        <div className="cart-items">
          <div className="cart-item">
            <div className="cart-item_left">
              <div className="item-title">Apollo</div>
              <div className="item-description">Running Short</div>
              <div className="item-price">$50.00</div>
              <div className="item-size">
                <span className="size-text">
                  SIZE:<br></br>
                </span>
                <div className="sizes">
                  <div className="xs">XS</div>
                  <div className="s">S</div>
                  <div className="m">M</div>
                  <div className="l">L</div>
                </div>
              </div>
              <div className="item-color">
                <span className="color-text">
                  COLOR:<br></br>
                </span>
                <div className="colors">
                  <div className="color"></div>
                  <div className="color"></div>
                  <div className="color"></div>
                </div>
              </div>
            </div>
            <div className="cart-item-right">
              <div className="item-count">
                <div className="plus">+</div>
                <div className="count">1</div>
                <div className="minus">
                  <span className="minus-content"></span>
                </div>
              </div>
              <div className="item-img">
                <img src="./Product D.png" alt="cart img"></img>
              </div>
            </div>
          </div>
          <div className="cart-item">
            <div className="cart-item_left">
              <div className="item-title">Apollo</div>
              <div className="item-description">Running Short</div>
              <div className="item-price">$50.00</div>
              <div className="item-size">
                <span className="size-text">
                  SIZE:<br></br>
                </span>
                <div className="sizes">
                  <div className="xs">XS</div>
                  <div className="s">S</div>
                  <div className="m">M</div>
                  <div className="l">L</div>
                </div>
              </div>
              <div className="item-color">
                <span className="color-text">
                  COLOR:<br></br>
                </span>
                <div className="colors">
                  <div className="color"></div>
                  <div className="color"></div>
                  <div className="color"></div>
                </div>
              </div>
            </div>
            <div className="cart-item-right">
              <div className="item-count">
                <div className="plus">+</div>
                <div className="count">1</div>
                <div className="minus">
                  <span className="minus-content"></span>
                </div>
              </div>
              <div className="item-img">
                <img src="./Product D.png" alt="cart img"></img>
              </div>
            </div>
          </div>
          <div className="cart-item">
            <div className="cart-item_left">
              <div className="item-title">Apollo</div>
              <div className="item-description">Running Short</div>
              <div className="item-price">$50.00</div>
              <div className="item-size">
                <span className="size-text">
                  SIZE:<br></br>
                </span>
                <div className="sizes">
                  <div className="xs">XS</div>
                  <div className="s">S</div>
                  <div className="m">M</div>
                  <div className="l">L</div>
                </div>
              </div>
              <div className="item-color">
                <span className="color-text">
                  COLOR:<br></br>
                </span>
                <div className="colors">
                  <div className="color"></div>
                  <div className="color"></div>
                  <div className="color"></div>
                </div>
              </div>
            </div>
            <div className="cart-item-right">
              <div className="item-count">
                <div className="plus">+</div>
                <div className="count">1</div>
                <div className="minus">
                  <span className="minus-content"></span>
                </div>
              </div>
              <div className="item-img">
                <img src="./Product D.png" alt="cart img"></img>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
