export default (state = [], action) => {
  console.log("Character action", action);
  console.log("Character state", state);
  switch (action.type) {
    case "SET_CHARACTER":
      return [...state, action.character];
    case "EDIT_CHARACTER":
      return state.map((each) => {
        if (each.id === action.updates.id) {
          return {
            ...each,
            ...action.updates,
          };
        } else {
          return each;
        }
      });
    case "SET_ACTIVE_CHARACTER":
      state.activeCharacter = action.activeCharacter;
      return [...state];
    default:
      return state;
  }
};
