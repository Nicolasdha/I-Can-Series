const defaultState = [];

export default (state = defaultState, action) => {
  console.log("Character action", action);
  console.log("Character state", state);
  switch (action.type) {
    case "EDIT_CHARACTER":
      console.log("EDIT");
      return state.map((each) => {
        console.log("peeeeep");
        if (each.nickname === action.nickname) {
          return {
            ...each,
            ...action.updates,
          };
        } else {
          return each;
        }
      });
    case "SET_CHARACTER":
      console.log("FUCK ME");

      return [...state, action.character];
    case "SET_ACTIVE_CHARACTER":
      console.log("FUCK YOU");
      state.activeCharacter = action.activeCharacter;
      return [...state];
    default:
      return state;
  }
};
