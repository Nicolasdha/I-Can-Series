const reducer = (state = [], action) => {
  // console.log("Basket action", action);
  // console.log("Basket state", state);
  switch (action.type) {
    case "ADD_ORDER":
      return [...state, action.order];
    case "SET_ORDERS":
      const orders = [];
      action.orders.map((each, index) => {
        each.basket.forEach((eachItem) => {
          orders.push(eachItem.item.id);
        });
      });
      return [{ orders: action.orders }, { orderIds: orders }];
    //case "SET_ORDERS_ID":
    // const orders = [];
    // action.orders.map((each, index) => {
    //   each.basket.forEach((eachItem) => {
    //     orders.push(eachItem.item.id);
    //   });
    // });
    //return state;
    //[{ orderIds: orders }];
    case "WIPE_ORDERS":
      return [];
    default:
      return state;
  }
};

export default reducer;
