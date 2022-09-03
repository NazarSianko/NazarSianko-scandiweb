import { combineReducers } from 'redux';

import cart from './cart';
import currency from './currency';
import overlay from './overlay';

const rootReducer = combineReducers({
  cart,
  currency,
  overlay,
});
export default rootReducer;
