import React, { Component } from 'react';
import '../styles/header.scss';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state  = {
            activeIndex: 0,
        }
    }
    setActive = index => {
        this.setState({
            activeIndex:index,
        })
    }
  render() {
    console.log(this.state)
    const sortItems = ['WOMAN','MAN','KIDS']
    return (
        <header className="showcase-header">
            <div className="header-sort">
                {sortItems.map((el,index) => <div onClick={()=>this.setActive(index)} className={"sort-item" + " " + `${this.state.activeIndex == index ? "sort-item-active" : ''}` } >
                    {el}
                </div>) }
                
            </div>
            <div className="header-logo">
                    <img src="./a-logo.png" alt="logo"></img>
            </div>
            <div className="header-right">
                <div className="header-change">
                    <img src="./$.png" alt="$"></img>
                </div>
                <div className="header-cart">
                    <img src="./Empty Cart.png"></img>
                </div>
            </div>
        </header>
    )
  }
}
