import React, { Component } from 'react';
import { connect } from 'react-redux';

class Cartitem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgIndex: 0,
    };
  }
  nextImg = () => {
    if (this.state.imgIndex < this.props.image.length - 1) {
      this.setState({
        imgIndex: this.state.imgIndex + 1,
      });
    }
  };
  prevImg = () => {
    if (this.state.imgIndex > 0) {
      this.setState({
        imgIndex: this.state.imgIndex - 1,
      });
    }
  };
  plusItem = () => {
    this.props.plusItem(this.props.state);
  };
  minusItem = () => {
    this.props.minusItem(this.props.state);
  };
  deleteItem = () => {
    this.props.deleteItem(this.props.state);
  };
  render() {
    const { brand, name, price, image, itemsCount, attributes, state, setActiveClass } = this.props;

    return (
      <div className="cart-item">
        <div className="cart-item_left">
          <div className="item-title">{name}</div>
          <div className="item-description">{brand}</div>
          <div className="item-price">
            {price[this.props.currIndex].currency.symbol +
              ' ' +
              (price[this.props.currIndex].amount * itemsCount).toFixed(2)}
          </div>
          {attributes.map((el) => (
            <div className="item-size">
              <span className="size-text">
                {el.name.toUpperCase() + ':'}
                <br></br>
              </span>
              <div className="sizes">
                {el.items.map((item, index) => (
                  <div
                    className={'size' + ' ' + `${setActiveClass(el.id, index, state)}`}
                    style={{
                      background: `${el.name === 'Color' ? item.value : ''}`,
                      width: `${el.name === 'Color' ? '39px' : ''}`,
                      height: `${el.name === 'Color' ? '39px' : ''}`,
                    }}>
                    {el.name === 'Color' ? '' : item.value}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="cart-item-right">
          <div className="item-count">
            <div className="plus" onClick={this.plusItem}>
              +
            </div>
            <div className="count">{itemsCount}</div>
            <div className="minus" onClick={this.minusItem}>
              <span className="minus-content"></span>
            </div>
          </div>
          <div className="item-img">
            <img src={`${image[this.state.imgIndex]}`} alt="cart img"></img>

            {image.length > 1 ? (
              <div>
                {' '}
                <div className="arrow-left" onClick={this.prevImg}>
                  <img src="./left.png"></img>
                </div>
                <div className="arrow-right" onClick={this.nextImg}>
                  <img src="./right.png"></img>
                </div>{' '}
              </div>
            ) : (
              ''
            )}
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
});
export default connect(mapStateToProps)(Cartitem);
