import React, { Component } from 'react';

export default class Loading extends Component {
  render() {
    return (
      <div className="loading-block">
        <img className="loading-img" alt="loading" src="./Loading.gif"></img>
      </div>
    );
  }
}
