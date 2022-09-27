import React, { Component } from 'react';
import '../../../styles/index.scss';
import { connect } from 'react-redux';
import { store } from '../../../redux/store';
import { changeCategory, saveActiveCategory } from '../../../redux/actions/category';
import { graphql } from '@apollo/client/react/hoc';
import classNames from 'classnames';
import { ALLCATEGORIES } from '../../../apollo/queries';

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
  }

  setActiveCategory = (index) => {
    store.dispatch(changeCategory(index));
    this.props.onChangeCategory(this.props.data.categories[index].name);
    store.dispatch(saveActiveCategory(this.props.data.categories[index].name));
  };

  render() {
    const {data} = this.props
    return (
      <div className="categories">
        {data.categories
          ? data.categories.map((el, index) => (
              <h1
                className={classNames('category-title', {
                  'category-active': this.props.categoryIndex === index,
                })}
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

const mapStateToProps = (state) => ({
  categoryIndex: state.category.index,
  name: state.category.name,
});
export default connect(mapStateToProps)(graphql(ALLCATEGORIES)(Categories));
