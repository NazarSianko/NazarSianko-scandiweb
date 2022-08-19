import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { Home, Header, Categories } from './components';
import client from './apollo/client';

import './styles/index.scss';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencyIndex: 0,
    }
  }
setCurrencyIndex = (index) => {
  this.setState({
    currencyIndex: index
  })
}
  render() {
    console.log(this.state.currencyIndex)
    return (
      <div className="wrapper">
        <div className="container">
          <Header  setCurrencyIndex={this.setCurrencyIndex}/>
        
          <Home client={client} currencyIndex ={this.state.currencyIndex} />
        </div>
      </div>
    );
  }
}

export default App;
