import { auth, firebase, database } from "../firebase/firebase";

export const addOrder = (order) => {
  return {
    type: "ADD_ORDER",
    order,
  };
};

//   export const startLogout = () => {
//     return () => {
//       return auth.signOut();
//     };
//   };

//   export const startLoginGoogle = () => {
//     return (dispatch) => {
//       return firebase.auth().signInWithPopup(googleAuthProvider);
//     };
//   };
