import React, { Component, createRef } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { CURRENCY } from '../../../apollo/queries';
import { connect } from 'react-redux';
import { changeCurrency } from '../../../redux/actions/currency';
import classNames from 'classnames';

class ChangeCurrency extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencyFlag: false,
    };
    this.currencyRef = createRef();
  }

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
  componentWillUnmount = () => {
    document.body.removeEventListener('click', this.handleOutsideClick);
  };

  render() {
    const {data} = this.props
    return (
      <div className="header-change" ref={this.currencyRef} onClick={() => this.openCurrencyList()}>
        {!data.loading && !data.error ? (
          <div className="currency-symbol">
            {data.currencies[this.props.currIndex].symbol}
            <div className="arrow">
              <i className={classNames('arrow-down', { 'arrow-up': this.state.currencyFlag })}></i>
            </div>
          </div>
        ) : (
          ''
        )}

        {this.state.currencyFlag ? (
          <div className="currency-list">
            {!data.loading && !data.error
              ? data.currencies.map((el, index) => (
                  <div
                    key={el.symbol}
                    className={classNames('currency-item', {
                      active: this.props.currIndex === index,
                    })}
                    onClick={() => this.props.setActiveCurrency(index)}>
                    {el.symbol} {el.label}
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

const mapStateToProps = (state) => ({
  currIndex: state.currency.index,
});
const mapDispatchToProps = (dispatch) => ({
  setActiveCurrency: (index) => dispatch(changeCurrency(index)),
});
export default connect(mapStateToProps, mapDispatchToProps)(graphql(CURRENCY)(ChangeCurrency));
