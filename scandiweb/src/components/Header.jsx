import React, { Component, createRef } from 'react';
import '../styles/header.scss';
import ChangeCurrency from './ChangeCurrency';

import { connect } from 'react-redux';
import MiniCart from './MiniCart';


class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
  }
  setActive = (index) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    const sortItems = ['WOMEN', 'MEN', 'KIDS'];
    return (
      <header className="showcase-header">
        <div className="header-sort">
          {sortItems.map((el, index) => (
            <div
              onClick={() => this.setActive(index)}
              key={el}
              className={
                'sort-item' + ' ' + `${this.state.activeIndex == index ? 'sort-item-active' : ''}`
              }>
              {el}
            </div>
          ))}
        </div>

        <div className="header-logo">
          <img src="./a-logo.png" alt="logo"></img>
        </div>

        <div className="header-right">
          <ChangeCurrency />

          <MiniCart setActiveClass={this.props.setActiveClass} />
        </div>
      </header>
    );
  }
}
const mapStateToProps = (state) => ({
  totalCount: state.cart.totalCount,
});
export default connect(mapStateToProps)(Header);
