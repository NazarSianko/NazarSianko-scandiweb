import React, { Component } from 'react';
import '../styles/index.scss';

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
  }
  setActiveCategory = (index) => {
    this.props.setCategory(index);
    this.setState({
      activeIndex: index,
    });
  };


  render() {
   
    

    return (
      <div className="categories">
        {this.props.categoryNames ?
          this.props.categoryNames.map((el, index) => (
              <h1
                className={
                  'category-title' +
                  ' ' +
                  `${this.state.activeIndex === index ? 'category-active' : ''}`
                }
                onClick={() => this.setActiveCategory(index)}>
                {el.name}
              </h1>
            ))
             : '' }
      </div>
    );
  }
}


export default Categories;
