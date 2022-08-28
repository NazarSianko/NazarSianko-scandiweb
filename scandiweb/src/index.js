import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/main.scss';
import App from './App';
import {  ApolloProvider } from '@apollo/client';
import client from './apollo/client';
import { BrowserRouter, Route,Routes,HashRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <ApolloProvider client={client}>
    <App />

    </ApolloProvider>
    </HashRouter>

  </React.StrictMode>
);

