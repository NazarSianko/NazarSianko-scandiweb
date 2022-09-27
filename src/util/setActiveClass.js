 const setActiveClass = (id, index, obj) => {
    return Object.keys(obj).find((keysItem) => keysItem === id) === id &&
      obj[id] === index &&
      id === 'Color'
      ? 'active-color'
      : Object.keys(obj).find((keysItem) => keysItem === id) === id &&
        obj[id] === index &&
        id !== 'Color'
      ? 'active'
      : '';
  };
  export default setActiveClass;