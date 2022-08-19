import React, { Component } from 'react';
import '../styles/index.scss';
import HomeItem from './HomeItem';
import { WithApollo } from 'react-apollo';
import { gql } from '@apollo/client';

import { graphql } from '@apollo/client/react/hoc';

import { Categories } from '../components';

export class Home extends Component {
  constructor(props) {
    super(props);
    
  }

  setCategory = (index) => {
    
    this.props.data.refetch({ input: { title: this.props.data.categories[index].name } });
  };
  render() {
    const { category } = this.props.data;

    return (
      <main className="showcase-main">
        <Categories
          setCategory={this.setCategory}
         categoryNames = {this.props.data.categories}
          setCategories={this.setCategories}
        />
        <div className="showcase-main-content">
          {!this.props.data.loading
            ? category.products.map((el) => (
                <HomeItem
                  id={el.id}
                  name={el.name}
                  inStock={el.inStock}
                  brand={el.brand}
                  description={el.description}
                  gallery={el.gallery}
                  price={el.prices}
                />
              ))
            : ''}
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
