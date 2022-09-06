import { combineReducers } from 'redux';

import cart from './cart';
import currency from './currency';
import overlay from './overlay';
import category from './category';
import currentId from './currentId';

const rootReducer = combineReducers({
  cart,
  currency,
  overlay,
  category,
  currentId,
});
export default rootReducer;
