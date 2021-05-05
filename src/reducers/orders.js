const reducer = (state = [], action) => {
  // console.log("Basket action", action);
  // console.log("Basket state", state);
  switch (action.type) {
    case "ADD_ORDER":
      return [...state, action.order];
    default:
      return state;
  }
};

export default reducer;
