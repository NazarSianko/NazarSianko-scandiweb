import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class BackArrow extends Component {
  render() {
    return (
      <NavLink to="/">
        <div className={this.props.className}>
          <img src="./back.png" alt="arrow-back"></img>
        </div>
      </NavLink>
    );
  }
}
