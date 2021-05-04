import React, { useState } from "react";
import { auth } from "../firebase/firebase";
import { useHistory } from "react-router-dom";
import { login } from "../actions/auth";
const VerifyLogin = () => {
  const history = useHistory();
  const [email1, setEmail] = useState("");
  const [password, setPassword] = useState("");
  var email = window.localStorage.getItem("emailForSignIn");

  if (auth.isSignInWithEmailLink(window.location.href)) {
    if (!email) {
      // User opened the link on a different device. To prevent session fixation
      // attacks, ask the user to provide the associated email again. For example:
      email = window.prompt("Please provide your email for confirmation");
    }
  }
  // The client SDK will parse the code from the link for you.

  const signIn = async (e) => {
    e.preventDefault();
    await auth
      .signInWithEmailLink(email, window.location.href)
      .then((result) => {
        console.log("YESSSS", result);
        // You can access the new user via result.user
        // Additional user info profile not available via:
        // result.additionalUserInfo.profile == null
        // You can check if the user is new or existing:
        // result.additionalUserInfo.isNewUser
      });

    await auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log(auth);
        console.log(auth.user.uid);

        if (auth) {
          history.push("/");
          login(auth.user.uid);
        }
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login__container">
        <h1>Sign-in</h1>
        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            // onChange={(e) => setEmail(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="login__signInButton"
            type="submit"
            onClick={signIn}
          >
            Sign in
          </button>
        </form>
        <button
          // onClick={register}
          className="login__registerButton"
        >
          Create your I Can Series Account
        </button>
      </div>
    </div>
  );
};

export default VerifyLogin;
