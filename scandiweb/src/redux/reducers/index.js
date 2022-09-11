import { combineReducers } from 'redux';

import cart from './cart';
import currency from './currency';
import overlay from './overlay';
import category from './category';
import currentId from './currentId';
import productAttributes from './productAttributes';
import filter from './filter';
import bodyClass from './bodyClass';

const rootReducer = combineReducers({
  cart,
  currency,
  overlay,
  category,
  currentId,
  productAttributes,
  filter,
  bodyClass,
});
export default rootReducer;
