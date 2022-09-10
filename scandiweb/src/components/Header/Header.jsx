import React, { Component } from "react";
import "../../styles/header.scss";
import ChangeCurrency from "./ChangeCurrency";

import { connect } from "react-redux";
import  MiniCart from "../MiniCart/MiniCart"
import classNames from "classnames";
import { setFilterName, setFilterIndex } from "../../redux/actions/filter";
import { NavLink } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
  }
  setActive = (index,name) => {
    this.props.setFilterIndex(index)
    this.props.setFIlterName(name)
  };

  render() {
    const sortItems = ["WOMEN", "MEN", "KIDS"];
    return (
      <header className="showcase-header">
        <div className="header-sort">
          {sortItems.map((el, index) => (
            <div
              onClick={() => this.setActive(index,el)}
              key={el}
              className={
                classNames("sort-item",{"sort-item-active":this.props.filterIndex === index})}
              >
              {el}
            </div>
          ))}
        </div>
<NavLink to ='/'>
        <div className="header-logo">
          <img src="./a-logo.png" alt="logo"></img>
        </div>
        </NavLink>
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
  filterIndex: state.filter.index,
});
const mapDispatchToProps = (dispatch) => ({
  setFIlterName : (name) => dispatch(setFilterName(name)),
  setFilterIndex: (index) => dispatch(setFilterIndex(index)),
})
export default connect(mapStateToProps,mapDispatchToProps)(Header);
