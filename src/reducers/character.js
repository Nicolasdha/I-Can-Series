const defaultState = {
  activeCharacter: null,
  characters: [],
};

export default (state = defaultState, action) => {
  // console.log("Character action", action);
  // console.log("Character state", state);
  switch (action.type) {
    case "CREATE_CHARACTER":
      state.characters.push(action.character);
      return { ...state };
    case "EDIT_CHARACTER":
      state.characters = state.characters.map((each) => {
        if (each.id === action.updates.id) {
          return { ...action.updates };
        } else {
          return each;
        }
      });
      return { ...state };
    case "READ_CHARACTERS":
      state.characters = action.characters;
      state.activeCharacter = action.currentActive;
      return { ...state };
    case "REMOVE_CHARACTER":
      state.characters = state.characters.filter(({ id }) => id !== action.id);
      return { ...state };
    case "SET_ACTIVE_CHARACTER":
      state.activeCharacter = action.activeCharacter;
      return { ...state };
    case "WIPE_CHARACTERS":
      return {};
    default:
      return state;
  }
};

// let keys = state.flatMap((each) => {
//   return Object.keys(each);
// });
// console.log(keys);
// if (
//   keys.find((each) => {
//     return each === "activeCharacter";
//   })
// ) {
//   console.log("GOT ITTTTT");
// } else {
//[...state, { activeCharacter: action.activeCharacter }]
// state.activeCharacter = action.activeCharacter;
