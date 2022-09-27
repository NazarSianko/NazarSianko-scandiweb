export const changeCategory = (index) => ({
  type: 'CHANGE_CATEGORY',
  payload: index,
});
export const saveActiveCategory = (name) => ({
  type: 'SAVE_ACTIVE_CATEGORY',
  payload: name,
});
