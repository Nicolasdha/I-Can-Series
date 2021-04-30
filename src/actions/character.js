export const setCharacter = ({ gender, ethnicity, passion, nickname }) => {
  console.log("setCharacter action fire");
  return {
    type: "SET_CHARACTER",
    character: {
      gender,
      ethnicity,
      passion,
      nickname,
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
