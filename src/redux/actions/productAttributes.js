import actionTypes from './actionTypes';
export const setAttributes = (obj) => ({
  type: actionTypes.SET_ATTRIBUTES,
  payload: obj,
});
