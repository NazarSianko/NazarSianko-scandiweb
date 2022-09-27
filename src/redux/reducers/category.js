const initialState = {
  index: 0,
  name: 'all',
};
const category = (state = initialState, action) => {
  if (action.type === 'CHANGE_CATEGORY') {
    return {
      ...state,
      index: action.payload,
    };
  }
  if (action.type === 'SAVE_ACTIVE_CATEGORY') {
    return {
      ...state,
      name: action.payload,
    };
  }
  return state;
};
export default category;
