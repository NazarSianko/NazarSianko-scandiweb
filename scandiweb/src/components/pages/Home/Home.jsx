import React, { Component } from 'react';
import '../../../styles/index.scss';
import '../../../styles/pdp.scss';
import HomeItem from './HomeItem';
import Categories from './Categories';
import { CATEGORIES } from '../../../apollo/queries';
import Loading from '../../Loading';
import { graphql } from '@apollo/client/react/hoc';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Overlay from '../../Overlay';
import {filterProducts} from '../../../util/filterProducts';

export class Home extends Component {
 

  onChangeCategory = (name) => {
    this.props.data.refetch({ input: { title: name } });
  };
renderProducts = (filteredProducts) => {
  return filteredProducts.map((el) => (
    <NavLink
      key={el.id}
      to={`/product/${el.id}`}
      style={{ pointerEvents: el.inStock ? 'auto' : 'none' }}>
      <HomeItem
        key={el.id}
        id={el.id}
        name={el.name}
        inStock={el.inStock}
        brand={el.brand}
        description={el.description}
        gallery={el.gallery}
        price={el.prices}
        attributes={el.attributes}
      />
    </NavLink>
  ));
  
}

  render() {
    const { category } = this.props.data;
     /* let products = [];
   if (!this.props.data.loading && !this.props.data.error) {
      products = category.products.map((el) => (
        <NavLink
          key={el.id}
          to={`/product/${el.id}`}
          style={{ pointerEvents: el.inStock ? 'auto' : 'none' }}>
          <HomeItem
            key={el.id}
            id={el.id}
            name={el.name}
            inStock={el.inStock}
            brand={el.brand}
            description={el.description}
            gallery={el.gallery}
            price={el.prices}
            attributes={el.attributes}
          />
        </NavLink>
      ));
      
    }*/
    let items=[];
    if(!this.props.data.loading && !this.props.data.error){
    items = filterProducts(category.products,this.props.filterName);
   console.log(items)
    }

    if (this.props.data.loading || this.props.data.error) {
      return <Loading />;
    } else {
      return (
        <main className="showcase-main">
          <Categories onChangeCategory={this.onChangeCategory} />

          <div className="showcase-main-content">
            {items.length ? this.renderProducts(items) : 
             <div className="no-products">No products available</div>
            
            /*this.props.filterName === 'WOMEN' ? (
              products.length == 0 ? (
                <div className="no-products">No products available</div>
              ) : (
                products
              )
            ) : this.props.filterName === 'MEN' ? (
              products.filter((item) => item.key.length > 15).length === 0 ? (
                <div className="no-products">No products available</div>
              ) : (
                products.filter((item) => item.key.length > 15)
              )
            ) : products.filter((item) => item.key.length < 15).length === 0 ? (
              <div className="no-products">No products available</div>
            ) : (
              products.filter((item) => item.key.length < 15)
            )*/}
          </div>
          {this.props.overlayFlag ? <Overlay /> : ''}
        </main>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  overlayFlag: state.overlay.flag,
  categoryIndex: state.category.index,
  items: state.cart.items,
  name: state.category.name,
  currentId: state.currentId.id,
  filterName: state.filter.name,
});

export default connect(mapStateToProps)(
  graphql(CATEGORIES, {
    options: (props) => {
      return {
        variables: {
          input: {
            title: props.name,
          },
        },
      };
    },
  })(Home),
);
