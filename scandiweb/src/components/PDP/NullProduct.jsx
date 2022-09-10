import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import BackArrow from '../BackArrow';

export default class NullProduct extends Component {
  render() {
    
    return (
      <div className='null-product'>
         
           <BackArrow className={'back-arrow-null'}/>
      <div className="null-product-title">This Product does not exist</div>;
      </div>
    )

  }
}

