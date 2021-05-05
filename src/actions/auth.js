import {
  auth,
  firebase,
  googleAuthProvider,
  facebookAuthProvider,
  twitterAuthProvider,
} from "../firebase/firebase";

export const login = (uid, user) => {
  return {
    type: "LOGIN",
    uid,
    user,
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
