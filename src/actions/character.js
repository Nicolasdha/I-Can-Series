export const setCharacter = ({ gender, ethnicity, passion, nickname, id }) => {
  console.log("setCharacter action fire");
  return {
    type: "SET_CHARACTER",
    character: {
      gender,
      ethnicity,
      passion,
      nickname,
      id,
    },
  };
};

export const setActiveCharacter = (activeCharacter) => {
  console.log("setActiveCharacter action fire");
  return {
    type: "SET_ACTIVE_CHARACTER",
    activeCharacter,
  };
};

export const editCharacter = (updates) => {
  console.log("EDIT CHAR fire ");
  return {
    type: "EDIT_CHARACTER",
    updates,
  };
};
