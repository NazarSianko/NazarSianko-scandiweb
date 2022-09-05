import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/main.scss';
import App from './App';
import { ApolloProvider } from '@apollo/client';
import client from './apollo/client';
import { BrowserRouter, Route, Routes, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store,persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HashRouter>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate  loading={null} persistor={ persistor}>
        <App />
        </PersistGate>
      </Provider>
    </ApolloProvider>
  </HashRouter>,
);
