const defaultState = [];

export default (state = defaultState, action) => {
  console.log("Character action", action);
  console.log("Character state", state);
  switch (action.type) {
    case "SET_CHARACTER":
      return [...state, action.character];
    case "SET_ACTIVE_CHARACTER":
      state.activeCharacter = action.activeCharacter;
      return state;
    default:
      return state;
  }
};
