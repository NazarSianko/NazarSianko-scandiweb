export const getTotalPrice = (items, index) =>
  Object.values(items)
    .map((obj) => obj.items)
    .flat()
    .reduce((sum, obj) => obj.price[index].amount + sum, 0);
