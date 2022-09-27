export const filterProducts = (items, filterName) => {
  if (filterName === 'WOMEN') {
    return items;
  }
  if (filterName === 'MEN') {
    return items.filter((item) => item.id.length > 15);
  } else {
    return items.filter((item) => item.id.length < 15);
  }
};
