import React, { Component } from 'react';
import { connect } from 'react-redux';


 class Cartitem extends Component {
 plusItem =() => {
  this.props.plusItem(this.props.id)
 }
  render() {
   const {brand, name, id , price,image, itemsCount } = this.props
   console.log(this.props.items)
    return (
        <div className="cart-item">
        <div className="cart-item_left">
          <div className="item-title">{name}</div>
          <div className="item-description">{brand}</div>
          <div className="item-price">{price}</div>
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
            <div className="plus" onClick={this.plusItem}>+</div>
            <div className="count">{itemsCount}</div>
            <div className="minus">
              <span className="minus-content"></span>
            </div>
          </div>
          <div className="item-img">
            <img src={`${image}`} alt="cart img"></img>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  items: state.cart.items,
 
});
export default connect(mapStateToProps)(Cartitem)