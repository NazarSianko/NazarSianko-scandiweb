import React, { Component } from 'react';
import '../styles/index.scss';
import '../styles/pdp.scss';
import HomeItem from './HomeItem';
import { WithApollo } from 'react-apollo';
import { gql } from '@apollo/client';

import { graphql } from '@apollo/client/react/hoc';

import { Categories } from '../components';
import { ProductDescription } from '../components';
import { Routes, Route, NavLink } from 'react-router-dom';

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencyIndex: 0,
    };
  }
  setCurrencyIndex = (index) => {
    this.setCurrencyIndex(index);
  };
  setCategory = (index) => {
    this.props.data.refetch({ input: { title: this.props.data.categories[index].name } });
  };
  setCurrentId = (id) => {
    this.props.setCurrentId(id);
  };
  clearCurrentId = () => {
    this.setState({
      currentId: '',
    });
  };
  render() {
    const { category } = this.props.data;

    return (
      <main className="showcase-main">
        <Categories
          setCategory={this.setCategory}
          categoryNames={this.props.data.categories}
          setCategories={this.setCategories}
        />

        <div className="showcase-main-content">
          {!this.props.data.loading && !this.props.data.error
            ? //? !this.state.currentId
              category.products.map((el) => (
                // <NavLink to={`/pdp/${el.id}`}>
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
                  currencyIndex={this.props.currencyIndex}
                  setCurrentId={this.setCurrentId}
                  setActiveClass={this.props.setActiveClass}
                />
                //</NavLink>
              ))
            : /* : category.products.map((el) =>
                  el.id === this.state.currentId ? (
                                   <ProductDescription
                      id={el.id}
                      name={el.name}
                      clearId={this.clearCurrentId}
                      inStock={el.inStock}
                      brand={el.brand}
                      currencyIndex={this.props.currencyIndex}
                      description={el.description}
                      attributes={el.attributes}
                      loading={this.props.data.loading}
                      gallery={el.gallery}
                      price={el.prices}
                    />
                  )  : (
                    ''
                  ),
                )*/
              ''}
        </div>
      </main>
    );
  }
}

const CATEGORIES = graphql(
  gql`
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
  `,
  {
    options: {
      variables: {
        input: { title: 'all' },
      },
    },
  },
);
const homeWithData = CATEGORIES(Home);

export default homeWithData;
