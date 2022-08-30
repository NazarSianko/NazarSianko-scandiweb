const initialState = {
    items:  {},
    totalPrice:  0,
    totalCount: 0,
  };
  const getTotalPrice = (arr) => arr.reduce((sum, obj) => obj.price + sum, 0);
  const getTotalCount = (obj) =>    Object.values(obj)
  .map((el) => el.items)
  .flat().length;
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
        
      const totalCount = getTotalCount(newItems)
      
        return {
          ...state,
          items: newItems,
          totalCount,
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
          
        const totalCount = getTotalCount(newItems)
        
        return {
          ...state,
          items: newItems,
          totalCount,
          
         
        };
      }
      case 'MINUS_CART_ITEM': {
        const oldItems = state.items[action.payload].items;
        const newObjItems =
          oldItems.length > 1 ? state.items[action.payload].items.slice(1) : oldItems;
        const newItems = {
          ...state.items,
          [action.payload]: {
            items: newObjItems,
           
          },
        };
        
        const totalCount = getTotalCount(newItems)
        return {
          ...state,
          items: newItems,
          totalCount,
         
        };
      }
      case 'REMOVE_CART_ITEM': {
        const newItems = {
          ...state.items,
        };
        const currentTotalPrice = newItems[action.payload].totalPrice;
        const currentTotalCount = newItems[action.payload].items.length;
        delete newItems[action.payload];
       
        return {
          ...state,
          items: newItems,
          
          totalCount: state.totalCount - currentTotalCount,
        };
      }
      case 'CLEAR_CART':
        return {
          items: {},
          
          totalCount: 0,
          
        };
      default:
        return state;
    }
}
export default cart;