import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { Home, Header, Categories } from './components';
import client from './apollo/client';

import './styles/index.scss';

export class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="wrapper">
        <div className="container">
          <Header />
        
          <Home client={client} />
        </div>
      </div>
    );
  }
}

export default App;
