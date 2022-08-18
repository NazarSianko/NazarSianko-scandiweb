import React, { Component } from 'react';
import '../styles/index.scss';
import HomeItem from './HomeItem';
import client from '../apollo/client';
import { gql } from '@apollo/client';
import { ApolloClient } from '@apollo/client';
import { graphql } from '@apollo/client/react/hoc';
import Category from './Categories';

export class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { categories } = this.props.data;

    return (
      <main className="showcase-main">
     
        <div className="showcase-main-content">
          {!this.props.data.loading
            ? categories[0].products.map((el) => (
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

const abc = graphql(gql`
  query TodoAppQuery {
    categories {
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
`);
const homeWithData = abc(Home);

export default homeWithData;
