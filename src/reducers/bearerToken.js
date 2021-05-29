const bearerToken = (state = {}, action) => {
  // console.log("bearer action", action);
  // console.log("bearer state", state);
  switch (action.type) {
    case "SET_BEARER_TOKEN":
      let token = action.bearerToken;
      return {
        bearerToken: token,
      };
    case "CLEAR_BEARER_TOKEN":
      return {};
    default:
      return state;
  }
};
export default bearerToken;
