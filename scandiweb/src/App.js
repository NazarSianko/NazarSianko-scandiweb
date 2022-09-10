import React, { Component } from 'react';


import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Cart from './components/Cart/Cart';
import ProductDescription from './components/PDP/ProductDescription';
import client from './apollo/client';
import { Route, Routes } from 'react-router-dom';
import './styles/index.scss';
import NullPage from './components/NullPage';


export class App extends Component {
  

 
  setActiveClass = (id, index, obj) => {
    return Object.keys(obj).find((keysItem) => keysItem === id) === id &&
      obj[id] === index &&
      id === 'Color'
      ? 'active-color'
      : Object.keys(obj).find((keysItem) => keysItem === id) === id &&
        obj[id] === index &&
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
              path={'/product/:id'}
              element={
                <ProductDescription
                 
                  setActiveClass={this.setActiveClass}
                />
              }
            />
            <Route 
            path="*" element={<NullPage/>}>

            </Route>
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
