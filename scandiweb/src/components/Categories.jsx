import React, { Component } from 'react';
import '../styles/index.scss';
import { gql } from '@apollo/client';
import { graphql } from '@apollo/client/react/hoc';
 class Categories extends Component {
  constructor (props) {
    super(props);
    this.state = {
      activeIndex: 0
    }
  }
  setActive = (index) => {
    this.setState({
      activeIndex:index
    })
    console.log(index)
  }
  
  render() {
    const {loading} = this.props.data
    console.log(this.state)
    return (
      <div className ="categories">
    
    
      { !loading ? this.props.data.categories.map((el,index)=> <h1 className={ 'category-title' + ' ' + `${this.state.activeIndex === index ? 'category-active' : ''}`} onClick ={()=>this.setActive(index)}>{el.name}</h1>) : ''}
      </div>
    )
  }
}
const ALL_CATEGORIES = graphql(gql`
  query TodoAppQuery {
    categories {
      name
      
    }
  }
`);
const CategoriesWithData =  ALL_CATEGORIES(Categories);

export default CategoriesWithData;
