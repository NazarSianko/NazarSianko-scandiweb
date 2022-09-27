import actionTypes from './actionTypes';
export const setFilterName = (name) => ({
  type: actionTypes.SET_FILTER_NAME,
  payload: name,
});
export const setFilterIndex = (index) => ({
  type: actionTypes.SET_FILTER_INDEX,
  payload: index,
});
