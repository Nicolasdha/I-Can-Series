import { auth, firebase, database } from "../firebase/firebase";

export const addOrder = (order) => {
  return {
    type: "ADD_ORDER",
    order,
  };
};

const setOrders = (orders) => {
  return {
    type: "SET_ORDERS",
    orders,
  };
};

const setOrdersId = (orders) => {
  return {
    type: "SET_ORDERS_ID",
    orders,
  };
};

export const startSetOrders = () => {
  return async (dispatch, getState) => {
    const uid = getState().authentication.uid;
    const orders = [];
    try {
      const ref = await database
        .collection("users")
        .doc(uid)
        .collection("orders")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log("penis", doc.data());
            orders.push(doc.data());
          });
        });
      console.log("THIS DA SHITTT", orders);

      dispatch(setOrders(orders));
      dispatch(setOrdersId(orders));
    } catch (error) {
      console.log(error);
      window.alert("Unable to perform action please try again");
    }
  };
};

export const wipeOrders = () => {
  return {
    type: "WIPE_ORDERS",
  };
};
