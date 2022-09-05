const initialState = {
  items: {},

  totalCount: 0,
  setActiveClass(id, index, obj) {
    return Object.keys(obj).find((keysItem) => keysItem == id) == id &&
      obj[id] == index &&
      id == 'Color'
      ? 'active-color'
      : Object.keys(obj).find((keysItem) => keysItem == id) == id &&
        obj[id] == index &&
        id !== 'Color'
      ? 'active'
      : '';
  },
};
const getTotalPrice = (newItems) =>
  Object.values(newItems)
    .map((obj) => obj.items)
    .flat()
    .reduce((sum, obj) => obj.price[0].amount + sum, 0);
const getTotalCount = (obj) =>
  Object.values(obj)
    .map((el) => el.items)
    .flat().length;
const cart = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const objState = JSON.stringify(action.payload.objState);
      const currentItems = !state.items[objState]
        ? [action.payload]
        : [...state.items[objState].items, action.payload];

      const newItems = {
        ...state.items,
        [objState]: {
          items: currentItems,
        },
      };

      const totalCount = getTotalCount(newItems);

      return {
        ...state,
        items: newItems,
        totalCount,
      };
    }
    case 'PLUS_CART_ITEM': {
      const objState = JSON.stringify(action.payload);
      const newObjItems = [...state.items[objState].items, state.items[objState].items[0]];
      const newItems = {
        ...state.items,
        [objState]: {
          items: newObjItems,
        },
      };

      const totalCount = getTotalCount(newItems);

      return {
        ...state,
        items: newItems,
        totalCount,
      };
    }
    case 'MINUS_CART_ITEM': {
      const objState = JSON.stringify(action.payload);
      const oldItems = state.items[objState].items;
      const newObjItems = oldItems.length > 1 ? state.items[objState].items.slice(1) : oldItems;
      const newItems = {
        ...state.items,
        [objState]: {
          items: newObjItems,
        },
      };

      const totalCount = getTotalCount(newItems);
      return {
        ...state,
        items: newItems,
        totalCount,
      };
    }
    case 'REMOVE_CART_ITEM': {
      const objState = JSON.stringify(action.payload);
      const newItems = {
        ...state.items,
      };

      const currentTotalCount = newItems[objState].items.length;
      delete newItems[objState];

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
};
export default cart;
