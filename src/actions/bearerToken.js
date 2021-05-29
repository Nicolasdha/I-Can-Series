import { database } from "../firebase/firebase";

export const setBearerTokenRedux = (bearerToken) => {
  return {
    type: "SET_BEARER_TOKEN",
    bearerToken,
  };
};

export const startSetBearerTokenRedux = () => {
  return async (dispatch, getState) => {
    const uid = getState().authentication.uid;
    let token = null;
    try {
      await database
        .collection("users")
        .doc(uid)
        .collection("bearerToken")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            token = doc.data();
          });
        });
      dispatch(setBearerTokenRedux(token.bearerToken));
    } catch (error) {
      console.log(error);
    }
  };
};

export const clearBearerTokenRedux = () => {
  return {
    type: "CLEAR_BEARER_TOKEN",
  };
};

export const startClearBearerTokenRedux = () => {
  return async (dispatch, getState) => {
    const uid = getState().authentication.uid;
    const stateToken = getState().bearerToken.bearerToken;

    try {
      await database
        .collection("users")
        .doc(uid)
        .collection("bearerToken")
        .doc(stateToken)
        .delete();
      dispatch(clearBearerTokenRedux());
    } catch (error) {
      console.log(error);
      window.alert("Unable to perform CLEAR token action please try again");
    }
  };
};
