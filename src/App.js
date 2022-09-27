import React, { Component } from 'react';
import Home from './components/pages/Home/Home';
import Header from './components/pages/Header/Header';
import Cart from './components/pages/Cart/Cart';
import ProductDescription from './components/pages/PDP/ProductDescription';
import client from './apollo/client';
import { Route, Routes } from 'react-router-dom';
import './styles/index.scss';
import NotFoundPage from './components/NotFoundPage';

export class App extends Component {
 
  render() {
    return (
      <div className="wrapper">
        <div className="container">
          <Header />
          <Routes >
            <Route path="/" element={<Home client={client} />} />

            <Route path="/cart" element={<Cart />} />
            <Route path={'/product/:id'} element={<ProductDescription />} />
            <Route path="*" element={<NotFoundPage />}></Route>
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
