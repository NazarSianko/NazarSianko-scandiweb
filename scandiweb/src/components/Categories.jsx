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
  //Тут вопрос по поводу двойного проклика, про который писал в тг. четвертая строка - это сохранение имени выбранной в данный момент категории в стор,
  // так как в Home при обновлении страницы для сохранения контента нужно это имя.
  // 2 запроса один за одним,  чтоб на основе первого получать массив с названиями категорий 
  //и  запрашивать сразу во втором по categoryIndex нужную категорию сделать не получилось
  //
  setActiveCategory = (index) => {
    store.dispatch(changeCategory(index));
   
    store.dispatch(saveActiveCategory(this.props.data.categories[this.props.categoryIndex].name));
    this.props.setCategory(this.props.name);
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
  name: state.category.name,
});
export default connect(mapStateToProps)(graphql(ALLCATEGORIES)(Categories));
