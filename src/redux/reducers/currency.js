import actionTypes from '../actions/actionTypes';
const initialState = {
  index: 0,
};
const currency = (state = initialState, action) => {
  if (action.type === actionTypes.CHANGE_CURRENCY) {
    return {
      ...state,
      index: action.payload,
    };
  }
  return state;
};
export default currency;
