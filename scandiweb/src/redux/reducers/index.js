import { combineReducers } from 'redux';

import cart from './cart';
import currency from './currency';
import overlay from './overlay';
import category from './category';

const rootReducer = combineReducers({
  cart,
  currency,
  overlay,
  category,
});
export default rootReducer;
