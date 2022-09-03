import React, { Component } from 'react';
import {connect} from 'react-redux';

 class OverlayItem extends Component {
    plusItem = () => {
        this.props.plusItem(this.props.state);
      };
      minusItem = () => {
        this.props.minusItem(this.props.state);
      };
  render() {
    const { brand, name, price, image, itemsCount, attributes, state, setActiveClass } = this.props;
    return (
      <div className='overlay-item'>
        <div className='overlay-item_left'>
            <div className='item-name'>{name}</div>
            <div className='item-brand'> {brand}</div>
            <div className='item-price'>{price[this.props.currIndex].currency.symbol +
              ' ' +
              (price[this.props.currIndex].amount * itemsCount).toFixed(2)}</div>
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
                      
                    }}>
                    {el.name === 'Color' ? '' : item.value}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className='overlay-item_right'>
            <div className='item-count'>
                <div className='plus' onClick={this.plusItem}>+</div>
                <div className='count'>{itemsCount}</div>
                <div className='minus'onClick={this.minusItem}><span className='minus-content'></span></div>
            </div>
            <div className='item-img'>
                <img src={image[0]} alt='overlay-img'></img>
            </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
   
    currIndex: state.currency.index,
  });
  export default connect(mapStateToProps)(OverlayItem)

