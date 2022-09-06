import React, { Component } from 'react';
import '../styles/index.scss';
import '../styles/pdp.scss';
import HomeItem from './HomeItem';

import { gql } from '@apollo/client';

import { graphql } from '@apollo/client/react/hoc';

import { Categories } from '../components';

import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Overlay from './Overlay';

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
      categoryNames: '',
    };
  }

  setCategory = (index) => {
    this.props.data.refetch({ input: { title: index } });
  };
  
  setCategoryNames = (name) => {
    this.setState({
      categoryNames: name,
    });
  };
  render() {
    const { category } = this.props.data;

    return (
      <main className="showcase-main">
        <Categories setCategory={this.setCategory} setCategoryNames={this.setCategoryNames} />

        <div className="showcase-main-content">
          {!this.props.data.loading && !this.props.data.error
            ? //? !this.state.currentId
              category.products.map((el) => (
                <NavLink
                  to={`/pdp/${el.id}`}
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
                  
                    setActiveClass={this.props.setActiveClass}
                  />
                </NavLink>
              ))
            : ''}
        </div>
        {this.props.overlayFlag ? <Overlay /> : ''}
      </main>
    );
  }
}

const CATEGORIES = gql`
  query CategoryQuery($input: CategoryInput) {
    categories {
      name
    }

    category(input: $input) {
      name
      products {
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
  }
`;

const mapStateToProps = (state) => ({
  overlayFlag: state.overlay.flag,
  categoryIndex: state.category.index,
  items: state.cart.items,
  name: state.category.name,
});

export default connect(mapStateToProps)(
  graphql(CATEGORIES, {
    options: (props, state) => {
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
