const reducer = (state = [], action) => {
  // console.log("Basket action", action);
  // console.log("Basket state", state);
  switch (action.type) {
    case "ADD_TO_BASKET":
      return [...state, action.item];
    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };
    case "REMOVE_FROM_BASKET":
      const index = state.findIndex((each) => each.item.id === action.id);

      const newBasket = [...state];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.log(
          `Cant remove product (id: ${action.id}) as it is not in the basket!`
        );
      }
      return [...newBasket];

    //   case "SET_USER":
    //     return { ...state, user: action.user };
    default:
      return state;
  }
};

export default reducer;

// case "ADD_TO_BASKET":
//       return {
//         ...state,
//         basket: [...state.basket, action.item],
//       };
