import React, { Children, Component } from 'react';
import '../styles/header.scss';
import { graphql } from '@apollo/client/react/hoc';
import { gql } from '@apollo/client';


 class ChangeCurrency extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeIndex:0,
            currencyFlag: false,
        }
    }
   
    setActiveItem = (index) => {
        this.setState ( {
            activeIndex: index,
        })
        this.props.setCurrencyIndex(index)
        
    }
    openCurrencyList = () => {
        this.setState ( {
            currencyFlag: !this.state.currencyFlag
        })
    }
  render() {
    

    return (
        <div className="header-change" onClick={() => this.openCurrencyList()}>
            <div className='currency-symbol'>
        {!this.props.data.loading ? this.props.data.categories[0].products[0].prices[this.state.activeIndex].currency.symbol : ''}
       </div>
       {this.state.currencyFlag ?  <div className="currency-list">
           { !this.props.data.loading ? this.props.data.categories[0].products[0].prices.map((el,index) => <div className= {'currency-item' + ' ' +  `${this.state.activeIndex === index ? 'active' : ''}` } onClick={() => this.setActiveItem(index)}>{el.currency.symbol}{" "}{el.currency.label}</div>) : ''}
        </div> : ''}
</div>
    )
  }
}
const CURRENCY = graphql(
    gql`
      query CategoryQuery {
       
        
            categories{
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
        
      
    `);
const ChangeCurrencyWithData = CURRENCY(ChangeCurrency)

export default ChangeCurrencyWithData