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

  render() {
    console.log(this.state);
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
                />
              }
            />

            <Route path="/cart" element={<Cart />} />
            <Route
              path={'/pdp/:id'}
              element={
                <ProductDescription
                  currencyIndex={this.state.currencyIndex}
                  id={this.state.currentId}
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
