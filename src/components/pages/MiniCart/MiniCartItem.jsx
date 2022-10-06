import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import setActiveClass from '../../../util/setActiveClass';

class MiniCartItem extends PureComponent {
  plusItem = () => {
    this.props.plusItem(this.props.state);
  };
  minusItem = () => {
    this.props.minusItem(this.props.state);
  };
  deleteItem = () => {
    this.props.deleteItem(this.props.state);
  };
  renderAttributes = (attributes, state) => {
    return attributes.map((el) => (
      <div className="cart-overlay-item_left-size" key={el.id}>
        <span className="size-text">
          {el.name.toUpperCase() + ':'}
          <br></br>
        </span>
        <div className="sizes">
          {el.items.map((item, index) => (
            <div
              key={item.value}
              className={'size' + ' ' + `${setActiveClass(el.id, index, state)}`}
              style={{
                background: `${el.name === 'Color' ? item.value : ''}`,
              }}>
              {el.name === 'Color' ? '' : item.value}
            </div>
          ))}
        </div>
      </div>
    ));
  };
  render() {
    const { brand, name, price, image, itemsCount, attributes, state } = this.props;
    return (
      <div className="cart-overlay-item">
        <div className="cart-overlay-item_left">
          <div className="cart-overlay-item_left-name">{name}</div>
          <div className="cart-overlay-item_left-brand"> {brand}</div>
          <div className="cart-overlay-item_left-price">
            {price[this.props.currIndex].currency.symbol +
              ' ' +
              (price[this.props.currIndex].amount * itemsCount).toFixed(2)}
          </div>
          {this.renderAttributes(attributes, state)}
        </div>
        <div className="cart-overlay-item_right">
          <div className="cart-overlay-item_right-count">
            <div className="plus" onClick={this.plusItem}>
              +
            </div>
            <div className="count">{itemsCount}</div>
            <div className="minus" onClick={this.minusItem}>
              <span className="minus-content"></span>
            </div>
          </div>
          <div className="cart-overlay-item_right-img">
            <img src={image[0]} alt="overlay-img"></img>
          </div>
          <div className="delete" onClick={this.deleteItem}>
            x
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  currIndex: state.currency.index,
  productAttributes: state.productAttributes.obj,
  currentId: state.currentId.id,
});
export default connect(mapStateToProps)(MiniCartItem);
