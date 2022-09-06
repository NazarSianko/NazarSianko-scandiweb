import React, { Component } from 'react';

import { Home, Header, Cart, ProductDescription } from './components';
import client from './apollo/client';
import { Route, Routes } from 'react-router-dom';
import './styles/index.scss';
import { connect } from 'react-redux';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
     

      objState: {},
    };
  }

 
  setActiveClass = (id, index, obj) => {
    return Object.keys(obj).find((keysItem) => keysItem == id) == id &&
      obj[id] == index &&
      id == 'Color'
      ? 'active-color'
      : Object.keys(obj).find((keysItem) => keysItem == id) == id &&
        obj[id] == index &&
        id !== 'Color'
      ? 'active'
      : '';
  };
  render() {
    return (
      <div className="wrapper">
        <div className="container">
          <Header  setActiveClass={this.setActiveClass} />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  client={client}
                  
                  setActiveClass={this.setActiveClass}
                />
              }
            />

            <Route
              path="/cart"
              element={
                <Cart
                  
                  setActiveClass={this.setActiveClass}
                />
              }
            />
            <Route
              path={'/pdp/:id'}
              element={
                <ProductDescription
                 
                  setActiveClass={this.setActiveClass}
                />
              }
            />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
