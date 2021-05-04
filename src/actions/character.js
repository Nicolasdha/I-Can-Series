import { database } from "../firebase/firebase";

const createCharacter = ({ gender, ethnicity, passion, nickname, id }) => {
  console.log("CREATE Character action fire");
  return {
    type: "CREATE_CHARACTER",
    character: {
      gender,
      ethnicity,
      passion,
      nickname,
      id,
    },
  };
};

export const startCreateCharacter = ({
  gender,
  ethnicity,
  passion,
  nickname,
  id,
}) => {
  return async (dispatch, getState) => {
    const uid = getState().authentication.uid;
    try {
      const ref = await database
        .collection("users")
        .doc(uid)
        .collection("characters")
        .doc(id)
        .set({ gender, ethnicity, passion, nickname, id });
      // dispatch(createCharacter({ gender, ethnicity, passion, nickname, id }));
    } catch (error) {
      console.log(error);
      window.alert("Unable to perform action please try again");
    }
  };
};

const setActiveCharacter = (activeCharacter) => {
  console.log("setActiveCharacter action fire");
  return {
    type: "SET_ACTIVE_CHARACTER",
    activeCharacter,
  };
};

export const startSetActiveCharacter = (activeCharacter) => {
  return async (dispatch, getState) => {
    const uid = getState().authentication.uid;
    try {
      const ref = await database
        .collection("users")
        .doc(uid)
        .collection("activeCharacter")
        .doc("currentActive")
        .set({ ...activeCharacter });
      dispatch(setActiveCharacter(activeCharacter));
    } catch (error) {
      console.log(error);
      window.alert("Unable to perform action please try again");
    }
  };
};

export const editCharacter = (updates) => {
  console.log("EDIT CHAR fire ");
  return {
    type: "EDIT_CHARACTER",
    updates,
  };
};

const readCharacters = (characters) => {
  return {
    type: "READ_CHARACTERS",
    characters,
  };
};

export const startReadCharacters = () => {
  return (dispatch, getState) => {
    const uid = getState().authentication.uid;
    const chars = [];
    try {
      database
        .collection("users")
        .doc(uid)
        .collection("characters")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            chars.push(doc.data());
          });
          dispatch(readCharacters(chars));
        });
    } catch (error) {
      console.log(error);
      window.alert("Unable to perform action please try again");
    }
  };
};
// database
// .collection("users")
// .doc(uid)
// .collection("characters")
// .onSnapshot((snapshot) => {
//   console.log(
//     snapshot.docs.map((each) => ({
//       data: each.data(),
//     }))
//   );

const removeCharacter = (id) => {
  return {
    type: "REMOVE_CHARACTER",
    id,
  };
};

export const startRemoveCharacter = (id) => {
  return async (dispatch, getState) => {
    const uid = getState().authentication.uid;
    try {
      await database
        .collection("users")
        .doc(uid)
        .collection("characters")
        .doc(id)
        .delete()
        .then(() => {
          dispatch(removeCharacter(id));
        });
    } catch (error) {
      console.log(error);
      window.alert("Unable to perform action please try again");
    }
  };
};

export const wipeCharacters = () => {
  return {
    type: "WIPE_CHARACTERS",
  };
};
