import actionTypes from './actionTypes';
export const changeCurrency = (index) => ({
  type: actionTypes.CHANGE_CURRENCY,
  payload: index,
});
