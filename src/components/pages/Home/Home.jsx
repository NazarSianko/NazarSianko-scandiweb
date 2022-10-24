import React, { PureComponent } from 'react';
import '../../../styles/index.scss';
import '../../../styles/pdp.scss';
import HomeItem from './HomeItem';
import { CATEGORIES } from '../../../apollo/queries';
import Loading from '../../Loading';
import { graphql } from '@apollo/client/react/hoc';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Overlay from '../../Overlay';

export class Home extends PureComponent {
  render() {
    const { data } = this.props;
    const { category } = this.props.data;

    if (data.loading || data.error) {
      return <Loading />;
    }

    return (
      <main className="showcase-main">
        <div className="showcase-main-content">
          {category.products.map((el) => (
            <NavLink key={el.id} to={`/product/${el.id}`}>
              <HomeItem
                key={el.id}
                id={el.id}
                name={el.name}
                inStock={el.inStock}
                brand={el.brand}
                description={el.description}
                gallery={el.gallery}
                price={el.prices}
                attributes={el.attributes}
                setActiveClass={this.props.setActiveClass}
              />
            </NavLink>
          ))}
        </div>
        {this.props.overlayFlag ? <Overlay /> : ''}
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  overlayFlag: state.overlay.flag,
  categoryIndex: state.category.index,
  items: state.cart.items,
  name: state.category.name,
  currentId: state.currentId.id,
  filterName: state.filter.name,
});

export default connect(mapStateToProps)(
  graphql(CATEGORIES, {
    options: (props) => {
      return {
        variables: {
          input: {
            title: props.name,
          },
        },
      };
    },
  })(Home),
);
