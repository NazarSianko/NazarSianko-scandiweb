import React, { Children, Component, createRef } from 'react';
import '../styles/header.scss';
import { graphql } from '@apollo/client/react/hoc';
import { gql } from '@apollo/client';

class ChangeCurrency extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: sessionStorage.getItem('currencyIndex') || 0,
      currencyFlag: false,
    };
    this.currencyRef = createRef();
  }
handleOutsideClick = (e) => {
    const pathInAllBrowsers = e.path || (e.composedPath && e.composedPath());
    if (!pathInAllBrowsers.includes(this.currencyRef.current)) {
      this.setState({currencyFlag:false})
      ;
    }
    console.log(1)
  };
  setActiveItem = (index) => {
    /*this.setState({
      activeIndex: index,
    });*/
    sessionStorage.setItem('currencyIndex', index);
    this.props.setCurrencyIndex(index);
  };
  openCurrencyList = () => {
    this.setState({
      currencyFlag: !this.state.currencyFlag,
    });
  };
  componentDidMount = () => {
    document.body.addEventListener('click', this.handleOutsideClick);
   
  }
  /*componentWillUnmount = () =>  {
    document.body.removeEventListener('click', this.handleOutsideClick);
    console.log('unmount')
  }*/

  render() {
    return (
      <div className="header-change" ref={this.currencyRef} onClick={() => this.openCurrencyList()}>
        <div className="currency-symbol">
          {!this.props.data.loading && !this.props.data.error
            ? this.props.data.categories[0].products[0].prices[
                sessionStorage.getItem('currencyIndex') || 0
              ].currency.symbol
            : ''}
        </div>
        {this.state.currencyFlag ? (
          <div className="currency-list">
            {!this.props.data.loading && !this.props.data.error
              ? this.props.data.categories[0].products[0].prices.map((el, index) => (
                  <div
                    className={
                      'currency-item' +
                      ' ' +
                      `${+sessionStorage.getItem('currencyIndex') === index ? 'active' : ''}`
                    }
                    onClick={() => this.setActiveItem(index)}>
                    {el.currency.symbol} {el.currency.label}
                  </div>
                ))
              : ''}
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}
const CURRENCY = graphql(
  gql`
    query CategoryQuery {
      categories {
        products {
          prices {
            currency {
              label
              symbol
            }
          }
        }
      }
    }
  `,
);
const ChangeCurrencyWithData = CURRENCY(ChangeCurrency);

export default ChangeCurrencyWithData;
