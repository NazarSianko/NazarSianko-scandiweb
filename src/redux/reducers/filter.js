import actionTypes from '../actions/actionTypes';
const initialState = {
  name: 'WOMEN',
  index: 0,
};
const filter = (state = initialState, action) => {
  if (action.type === actionTypes.SET_FILTER_NAME) {
    return {
      ...state,
      name: action.payload,
    };
  }
  if (action.type === actionTypes.SET_FILTER_INDEX) {
    return {
      ...state,
      index: action.payload,
    };
  }
  return state;
};
export default filter;
