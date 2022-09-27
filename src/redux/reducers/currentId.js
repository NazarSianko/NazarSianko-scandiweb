import actionTypes from '../actions/actionTypes';
const initialState = {
  id: '',
};
const currentId = (state = initialState, action) => {
  if (action.type === actionTypes.SET_CURRENT_ID) {
    return {
      ...state,
      id: action.payload,
    };
  }
  return state;
};
export default currentId;
