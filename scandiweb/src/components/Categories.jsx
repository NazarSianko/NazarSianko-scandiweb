import React, { Component } from 'react';
import '../styles/index.scss';
import { connect } from 'react-redux';
import { persistor, store } from '../redux/store';
import { changeCategory, saveActiveCategory } from '../redux/actions/category';

import { gql } from '@apollo/client';

import { graphql } from '@apollo/client/react/hoc';
class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
  }
  setActiveCategory = (index) => {
    store.dispatch(changeCategory(index));
    this.props.setCategory(this.props.data.categories[this.props.categoryIndex].name);
    store.dispatch(saveActiveCategory(this.props.data.categories[this.props.categoryIndex].name));
  };

  render() {
    return (
      <div className="categories">
        {this.props.data.categories
          ? this.props.data.categories.map((el, index) => (
              <h1
                className={
                  'category-title' +
                  ' ' +
                  `${this.props.categoryIndex === index ? 'category-active' : ''}`
                }
                key={el.name}
                onClick={() => this.setActiveCategory(index)}>
                {el.name}
              </h1>
            ))
          : ''}
      </div>
    );
  }
}
const ALLCATEGORIES = gql`
  {
    categories {
      name
    }
  }
`;
const mapStateToProps = (state) => ({
  categoryIndex: state.category.index,
});
export default connect(mapStateToProps)(graphql(ALLCATEGORIES)(Categories));
