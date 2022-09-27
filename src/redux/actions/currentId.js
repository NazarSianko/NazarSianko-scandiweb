import actionTypes from './actionTypes';
export const setId = (id) => ({
  type: actionTypes.SET_CURRENT_ID,
  payload: id,
});
