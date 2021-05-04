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

export const emptyBasket = () => {
  return {
    type: "EMPTY_BASKET",
  };
};
