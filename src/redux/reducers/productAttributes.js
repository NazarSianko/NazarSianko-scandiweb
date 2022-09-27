import actionTypes from '../actions/actionTypes';
const initialState = {
  obj: {},
};
const productAttributes = (state = initialState, action) => {
  if (action.type === actionTypes.SET_ATTRIBUTES) {
    return {
      ...state,
      obj: action.payload,
    };
  }
  return state;
};
export default productAttributes;
