import {
  auth,
  firebase,
  googleAuthProvider,
  facebookAuthProvider,
  twitterAuthProvider,
} from "../firebase/firebase";

export const login = (uid) => {
  return {
    type: "LOGIN",
    uid,
  };
};

export const logout = () => {
  return {
    type: "LOGOUT",
  };
};

export const startLogout = () => {
  return () => {
    return auth.signOut();
  };
};

export const startLoginGoogle = () => {
  return (dispatch) => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  };
};

export const startLoginFacebook = () => {
  return (dispatch) => {
    return firebase.auth().signInWithPopup(facebookAuthProvider);
  };
};

export const startLoginTwitter = () => {
  return (dispatch) => {
    return firebase.auth().signInWithPopup(twitterAuthProvider);
  };
};
