export const addToBasket = (item) => {
  return {
    type: "ADD_TO_BASKET",
    item,
  };
};

export const removeFromBasket = (id) => {
  return {
    type: "REMOVE_FROM_BASKET",
    id,
  };
};
