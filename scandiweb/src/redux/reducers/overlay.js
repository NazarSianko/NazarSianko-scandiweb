const initialState = {
    flag: false,
  };
  const overlay = (state = initialState, action) => {
    if (action.type === 'CHANGE_OVERLAY_FLAG') {
      return {
        ...state,
        flag: action.payload,
      };
    }
    return state;
  };
  export default overlay;