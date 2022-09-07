import React, { Component } from 'react';
import '../styles/pdp.scss';
import { gql } from '@apollo/client';
import { NavLink, withRouter } from 'react-router-dom';
import { graphql } from '@apollo/client/react/hoc';
import { persistor, store } from '../redux/store';
import { addItem } from '../redux/actions/cart';
import { connect } from 'react-redux';
import Overlay from './Overlay';
import Loading from './Loading';
import classNames from 'classnames';
import { setAttributes } from '../redux/actions/productAttributes';

class ProductDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgIndex: 0,
    };
  }
  // эти атрибуты , которые динамически создаются в стейте, тоже нужно бы сохранять при перезагрузке страницы, но хз, как это сделать 
  static getDerivedStateFromProps(props, state) {
    if (!state.activeAttributes) {
      return {
        activeAttributes: props.data.product
          ? props.data.product.attributes.length == 0
            ? { id: props.id }
            : props.data.product.attributes.reduce((obj, el) => {
                obj[el.name] = 0;
                obj.id = props.id;
                return obj;
              }, {})
          : '',
      };
    }
    return state;
  }
componentMount = (prevProps) => {
    if (prevProps !== this.props) {
    if (!this.props.productAttributes[this.props.currentId]) {
      this.props.setActiveAttributes({
        [this.props.currentId]: this.props.data.product
          ? this.props.data.product.attributes.length == 0
            ? { id: this.props.id }
            : this.props.data.product.attributes.reduce((obj, el) => {
                obj[el.name] = 0;
                obj.id = this.props.currentId;
                return obj;
              }, {})
          : '',
      })
    }
  }
}
/*setAtt = () => {
  this.setState((state) => ({
    activeAttributes: {
      ...state.activeAttributes,
      [el.id]: index,
      id: this.props.id,
    },
    
}))

}*/
  setCartItem = () => {
    const obj = {
      id: this.props.currentId,
      price: this.props.data.product.prices,
      brand: this.props.data.product.brand,
      name: this.props.data.product.name,
      image: this.props.data.product.gallery,
      attributes: this.props.data.product.attributes,
      objState: this.props.productAttributes[this.props.currentId],
    };
    this.props.setItem(obj)
  };
  setImageId = (index) => {
    this.setState({
      imgIndex: index,
    });
  };
  createMarkUp = () => ({
    __html: this.props.data.product ? this.props.data.product.description : '',
  });

  render() {
    const {overlayFlag,data} = this.props
   
    if (this.props.data.loading || this.props.data.error) {
      return <Loading />
    }
    console.log(this.props.productAttributes)
    return (
      <div className="pdp-main">
       
        {overlayFlag ? <Overlay/> : ''}
          <div className="pdp-cart">
            <NavLink to="/">
              <div className="back-arrow">
                <img src="./back.png"></img>
              </div>
            </NavLink>
            <div className="pdp-cart-main">
            <div className="pdp-left-imgs">
              {this.props.data.product.gallery.map((el, index) => (
                <div 
                  className={classNames("pdp-left-img",{'active-color':this.state.imgIndex == index})
                    //'pdp-left-img' + ' ' + `${this.state.imgIndex == index ? 'active-color' : ' '}`
                  }
                  onClick={()=>this.setImageId(index)}>
                  <img src={el} alt="small img"></img>
                </div>
              ))}
            </div>
            
              <div className="cart-img">
                <img src={this.props.data.product.gallery[this.state.imgIndex]} alt="pdp img"></img>
              </div>
                  </div>
              <div className="cart-item_left">
                <div className="item-title">{this.props.data.product.name}</div>
                <div className="item-description">{this.props.data.product.brand}</div>

                {this.props.data.product.attributes.map((el) => (
                  <div className="item-size" key = {el.name}>
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
                              this.props.productAttributes[this.props.currentId]
                            )}`
                            }
                          style={{
                            background: `${el.name === 'Color' ? item.value : ''}`,
                            width: `${el.name === 'Color' ? '39px' : ''}`,
                            height: `${el.name === 'Color' ? '39px' : ''}`,
                          }}
                          onClick={() =>
                            this.props.setActiveAttributes(({
                              ...this.props.productAttributes,
                              [this.props.currentId]:{
                                ...this.props.productAttributes[this.props.currentId],
                              [el.id]: index,
                              id:this.props.currentId,
                              }
                              
                           
                            
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
                    {this.props.data.product.prices[this.props.currIndex].currency.symbol +
                      ' ' +
                      this.props.data.product.prices[this.props.currIndex].amount}
                  </span>
                </div>
                <button className="pdp-button" onClick={this.setCartItem}>
                  <span>ADD TO CART</span>
                </button>
                <div className="item-about">
                  <span dangerouslySetInnerHTML={this.createMarkUp()}></span>
                </div>
              </div>
            </div>
        
       
        
      </div>
    );
  }
}
const CATEGORY = gql`
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
const mapStateToProps = (state) => ({
  currIndex: state.currency.index,
  overlayFlag: state.overlay.flag,
  productAttributes: state.productAttributes.obj,
  currentId: state.currentId.id, //Это айди, который кидается в стор при нажатии на конкретный HomeItem, при нажатии на кнопку "назад " в браузере не возвращает на тот айтем,
  // на котором юзер был в предыдущий раз, а на тот, чей айди в сторе был последним, хз как это пофиксить
});
const mapDispatchToProps = (dispatch) => ({
  setItem: (obj) => dispatch(addItem(obj)),
  setActiveAttributes: (obj) => dispatch(setAttributes(obj))
})

export default connect(mapStateToProps,mapDispatchToProps)(
  graphql(CATEGORY, {
    options: (props) => {
      return {
        variables: {
          id: props.currentId,
        },
      };
    },
  })(ProductDescription),
);
