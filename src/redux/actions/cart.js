import actionTypes from './actionTypes';
export const addItem = (cartObj) => ({
  type: actionTypes.ADD_ITEM,
  payload: cartObj,
});
export const plusCartItem = (objState) => ({
  type: actionTypes.PLUS_CART_ITEM,
  payload: objState,
});
export const minusCartItem = (objState) => ({
  type: actionTypes.MINUS_CART_ITEM,
  payload: objState,
});
export const deleteCartItem = (objState) => ({
  type: actionTypes.REMOVE_CART_ITEM,
  payload: objState,
});
export const clearCart = () => ({
  type: actionTypes.CLEAR_CART,
});
