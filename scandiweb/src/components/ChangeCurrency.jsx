import React, { Children, Component, createRef } from 'react';
import '../styles/header.scss';
import { graphql } from '@apollo/client/react/hoc';
import { gql } from '@apollo/client';
import { persistor, store } from '../redux/store';
import { connect } from 'react-redux';
import { changeCurrency } from '../redux/actions/currency';

class ChangeCurrency extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencyFlag: false,
    };
    this.currencyRef = createRef();
  }

  setActiveItem = (index) => {
    store.dispatch(changeCurrency(index));
  };
  openCurrencyList = () => {
    this.setState({
      currencyFlag: !this.state.currencyFlag,
    });
  };
  handleOutsideClick = (e) => {
    const pathInAllBrowsers = e.path || (e.composedPath && e.composedPath());
    if (!pathInAllBrowsers.includes(this.currencyRef.current)) {
      this.setState({ currencyFlag: false });
    }
  };
  componentDidMount = () => {
    document.body.addEventListener('click', this.handleOutsideClick);
  };
  /*componentWillUnmount = () =>  {
    document.body.removeEventListener('click', this.handleOutsideClick);
    console.log('unmount')
  }*/

  render() {
    return (
      <div className="header-change" ref={this.currencyRef} onClick={() => this.openCurrencyList()}>
        <div className="currency-symbol">
          {!this.props.data.loading && !this.props.data.error
            ? this.props.data.categories[0].products[0].prices[this.props.currIndex].currency.symbol
            : ''}
        </div>
        {this.state.currencyFlag ? (
          <div className="currency-list">
            {!this.props.data.loading && !this.props.data.error
              ? this.props.data.categories[0].products[0].prices.map((el, index) => (
                  <div
                    className={
                      'currency-item' + ' ' + `${this.props.currIndex === index ? 'active' : ''}`
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

const mapStateToProps = (state) => ({
  currIndex: state.currency.index,
});
export default connect(mapStateToProps)(ChangeCurrencyWithData);
