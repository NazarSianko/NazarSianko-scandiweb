import actionTypes from './actionTypes';
export const changeCategory = (index) => ({
  type: actionTypes.CHANGE_CATEGORY,
  payload: index,
});
export const saveActiveCategory = (name) => ({
  type: actionTypes.SAVE_ACTIVE_CATEGORY,
  payload: name,
});
