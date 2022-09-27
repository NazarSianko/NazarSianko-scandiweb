import React, { PureComponent } from 'react';
import '../../../styles/header.scss';
import ChangeCurrency from './ChangeCurrency';
import { connect } from 'react-redux';
import MiniCart from '../MiniCart/MiniCart';
import classNames from 'classnames';
import { setFilterName, setFilterIndex } from '../../../redux/actions/filter';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}
class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
  }
  setActive = (index, name) => {
    this.props.setFilterIndex(index);
    this.props.setFIlterName(name);
  };

  render() {
    const sortItems = ['WOMEN', 'MEN', 'KIDS'];
    return (
      <header className="showcase-header">
        <div className="header-sort">
          {sortItems.map((el, index) => (
            <div
              onClick={() => this.setActive(index, el)}
              key={el}
              className={classNames('sort-item', {
                'sort-item-active': this.props.filterIndex === index,
              })}>
              {el}
            </div>
          ))}
        </div>

        <div className="header-logo" onClick={() => this.props.router.navigate(-1)}>
          <img src="./a-logo.png" alt="logo"></img>
        </div>

        <div className="header-right">
          <ChangeCurrency />

          <MiniCart />
        </div>
      </header>
    );
  }
}
const mapStateToProps = (state) => ({
  totalCount: state.cart.totalCount,
  filterIndex: state.filter.index,
});
const mapDispatchToProps = (dispatch) => ({
  setFIlterName: (name) => dispatch(setFilterName(name)),
  setFilterIndex: (index) => dispatch(setFilterIndex(index)),
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
