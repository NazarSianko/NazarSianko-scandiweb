export const addItem = (cartObj) => ({
    type: 'ADD_ITEM',
    payload: cartObj,
  });
  export const plusCartItem = (id) => ({
    type:'PLUS_CART_ITEM',
    payload: id,
  })
  export const minusCartItem = (id) => ({
    type:'MINUS_CART_ITEM',
    payload: id,
  })
  export const deleteCartItem = (id) => ({
    type: 'REMOVE_CART_ITEM',
    payload: id,
  })
  export const clearCart = () => ({
    type: 'CLEAR_CART',
  })