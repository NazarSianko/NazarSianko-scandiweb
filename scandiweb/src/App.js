import React, { Component } from 'react';

import { Home, Header, Cart, ProductDescription } from './components';
import client from './apollo/client';
import { Route, Routes } from 'react-router-dom';
import './styles/index.scss';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencyIndex: 0,
      currentId: sessionStorage.getItem('id') || '',
      objState: {},
    };
  }
  setCurrentId = (id) => {
    this.setState({
      currentId: id,
    });
    sessionStorage.setItem('id', id);
  };
  setCurrencyIndex = (index) => {
    this.setState({
      currencyIndex: index,
    });
  };
  setActiveClass = (id, index ,obj) => {
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
          <Header setCurrencyIndex={this.setCurrencyIndex} />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  client={client}
                  currencyIndex={this.state.currencyIndex}
                  setCurrentId={this.setCurrentId}
                  setActiveClass = {this.setActiveClass}
                />
              }
            />

            <Route path="/cart" element={<Cart currencyIndex={this.state.currencyIndex} />} />
            <Route
              path={'/pdp/:id'}
              element={
                <ProductDescription
                  currencyIndex={this.state.currencyIndex}
                  id={this.state.currentId}
                  setActiveClass = {this.setActiveClass}
                 
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
