import React, { PureComponent } from 'react';

export default class Loading extends PureComponent {
  render() {
    return (
      <div className="loading-block">
        <img className="loading-img" alt="loading" src="./Loading.gif"></img>
      </div>
    );
  }
}
