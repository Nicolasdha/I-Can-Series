import { auth } from "../firebase/firebase";

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
