import actionTypes from '../actions/actionTypes';
const initialState = {
  index: 0,
  name: 'all',
};
const category = (state = initialState, action) => {
  if (action.type === actionTypes.CHANGE_CATEGORY) {
    return {
      ...state,
      index: action.payload,
    };
  }
  if (action.type === actionTypes.SAVE_ACTIVE_CATEGORY) {
    return {
      ...state,
      name: action.payload,
    };
  }
  return state;
};
export default category;
