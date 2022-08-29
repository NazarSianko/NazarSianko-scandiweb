export const addItem = (cartObj) => ({
    type: 'ADD_ITEM',
    payload: cartObj,
  });
  export const plusCartItem = (id) => ({
    type:'PLUS_CART_ITEM',
    payload: id,
  })