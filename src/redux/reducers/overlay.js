import actionTypes from '../actions/actionTypes';
const initialState = {
  flag: false,
};
const overlay = (state = initialState, action) => {
  if (action.type === actionTypes.CHANGE_OVERLAY_FlAG) {
    return {
      ...state,
      flag: action.payload,
    };
  }
  return state;
};
export default overlay;
