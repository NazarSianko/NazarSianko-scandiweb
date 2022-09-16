const initialState = {
  class: 'body-active',
};
const bodyClass = (state = initialState, action) => {
  if (action.type === 'SET_BODY_CLASS') {
    return {
      ...state,
    };
  }
  return state;
};
export default bodyClass;
