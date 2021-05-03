const auth = (state = {}, action) => {
  // console.log("auth action", action);
  // console.log("auth state", state);
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        uid: action.uid,
      };
    case "LOGOUT":
      return {};
    default:
      return state;
  }
};
export default auth;
