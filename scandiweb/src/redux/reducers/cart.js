const initialState = {
    items:  {},
    totalPrice:  0,
    totalCount: 0,
  };
 const cart = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_ITEM': {
        const currentPizzaItems = !state.items[action.payload.id]
        ? [action.payload]
        : [...state.items[action.payload.id].items, action.payload];
      

      
      const newItems = {
        ...state.items,
        [action.payload.id]: {
          items: currentPizzaItems,
          
        },
        
      };
        
      const allItems = Object.values(newItems)
      .map((obj) => obj.items)
      .flat();
      
        return {
          ...state,
          items: newItems,
          totalCount: allItems.length
        };
      }
      case 'PLUS_CART_ITEM': {
        const newObjItems = [
          ...state.items[action.payload].items,
          state.items[action.payload].items[0],
        ];
        const newItems = {
          ...state.items,
          [action.payload]: {
            items: newObjItems,
           
          },
        };
          
        
        
        return {
          ...state,
          items: newItems,
          
         
        };
      }
      default:
        return state;
    }
}
export default cart;