import React, { PureComponent } from 'react';
import '../../../styles/pdp.scss';
import { PRODUCT } from '../../../apollo/queries';
import { graphql } from '@apollo/client/react/hoc';
import NotFoundProduct from './NotFoundProduct';
import { addItem } from '../../../redux/actions/cart';
import { connect } from 'react-redux';
import Overlay from '../../Overlay';
import Loading from '../../Loading';
import classNames from 'classnames';
import { setAttributes } from '../../../redux/actions/productAttributes';
import setActiveClass from '../../../util/setActiveClass';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}
class ProductDescription extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      imgIndex: 0,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (!state.activeAttributes) {
      return {
        activeAttributes: props.data.product
          ? props.data.product.attributes.length === 0
            ? { id: props.router.params.id }
            : props.data.product.attributes.reduce((obj, el) => {
                obj[el.name] = 0;
                obj.id = props.router.params.id;
                return obj;
              }, {})
          : '',
      };
    }
    return state;
  }

  setCartItem = () => {
    const obj = {
      id: this.props.currentId,
      price: this.props.data.product.prices,
      brand: this.props.data.product.brand,
      name: this.props.data.product.name,
      image: this.props.data.product.gallery,
      attributes: this.props.data.product.attributes,
      objState: this.state.activeAttributes,
    };
    this.props.setItem(obj);
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
    const { overlayFlag, data } = this.props;

    if (data.loading || data.error) {
      return <Loading />;
    }
    if (!data.product) {
      return <NotFoundProduct />;
    }
    return (
      <div className="pdp-main">
        {overlayFlag ? <Overlay /> : ''}
        <div className="pdp-cart">
          <div className="pdp-cart-main">
            <div className="pdp-left-imgs">
              {data.product.gallery.map((el, index) => (
                <div
                  key={el}
                  className={classNames('pdp-left-img', {
                    'active-color': this.state.imgIndex === index,
                  })}
                  onClick={() => this.setImageId(index)}>
                  <img src={el} alt="small img"></img>
                </div>
              ))}
            </div>

            <div className="cart-img">
              <img src={data.product.gallery[this.state.imgIndex]} alt="pdp img"></img>
            </div>
          </div>
          <div className="cart-item_left">
            <div className="item-title">{data.product.name}</div>
            <div className="item-description">{data.product.brand}</div>

            {data.product.attributes.map((el) => (
              <div className="item-size" key={el.name}>
                <span className="size-text">
                  {el.name.toUpperCase() + ':'}
                  <br></br>
                </span>
                <div className="sizes">
                  {el.items.map((item, index) => (
                    <div
                      key={item.value}
                      className={
                        'size' +
                        ' ' +
                        `${
                          data.product.inStock
                            ? setActiveClass(el.id, index, this.state.activeAttributes)
                            : ' '
                        }`
                      }
                      style={{
                        backgroundColor: `${
                          data.product.inStock ? (el.name === 'Color' ? item.value : '') : '#d4d4d4'
                        }`,
                        opacity: `${!data.product.inStock ? '0.2' : '1'}`,
                        width: `${el.name === 'Color' ? '39px' : ''}`,
                        height: `${el.name === 'Color' ? '39px' : ''}`,
                        pointerEvents: data.product.inStock ? 'auto' : 'none',
                      }}
                      onClick={() =>
                        this.setState((state) => ({
                          activeAttributes: {
                            ...state.activeAttributes,
                            [el.id]: index,
                            id: this.props.router.params.id,
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
                {data.product.prices[this.props.currIndex].currency.symbol +
                  ' ' +
                  data.product.prices[this.props.currIndex].amount}
              </span>
            </div>
            <button
              className={classNames('pdp-button', { out: !data.product.inStock })}
              onClick={this.setCartItem}
              style={{ pointerEvents: data.product.inStock ? 'auto' : 'none' }}>
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

const mapStateToProps = (state) => ({
  currIndex: state.currency.index,
  overlayFlag: state.overlay.flag,
  productAttributes: state.productAttributes.obj,
  currentId: state.currentId.id,
});
const mapDispatchToProps = (dispatch) => ({
  setItem: (obj) => dispatch(addItem(obj)),
  setActiveAttributes: (obj) => dispatch(setAttributes(obj)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  withRouter(
    graphql(PRODUCT, {
      options: (props) => {
        return {
          variables: {
            id: props.router.params.id,
          },
        };
      },
    })(ProductDescription),
  ),
);
