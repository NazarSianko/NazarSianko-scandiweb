export const addItem = (cartObj) => ({
  type: 'ADD_ITEM',
  payload: cartObj,
});
export const plusCartItem = (objState) => ({
  type: 'PLUS_CART_ITEM',
  payload: objState,
});
export const minusCartItem = (objState) => ({
  type: 'MINUS_CART_ITEM',
  payload: objState,
});
export const deleteCartItem = (objState) => ({
  type: 'REMOVE_CART_ITEM',
  payload: objState,
});
export const clearCart = () => ({
  type: 'CLEAR_CART',
});
