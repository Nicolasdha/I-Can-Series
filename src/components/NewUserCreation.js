import React, { useState } from "react";

import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { login } from "../actions/auth";

export const NewUserCreation = ({ login }) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [pageMessage, setPageMessage] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const register = async (e) => {
    e.preventDefault();
    if (password1 !== password2) {
      setPageMessage("Passwords do not match");
      return;
    }
    await auth
      .createUserWithEmailAndPassword(email.toLowerCase().trim(), password1)
      .then((auth1) => {
        // Success
        console.log(auth);
        setSubmitted(true);

        auth.currentUser
          .sendEmailVerification()
          .then(function () {
            // Verification email sent.
            setTimeout(() => {
              history.push("/");
            }, 2000);
          })
          .catch(function (error) {
            // Error occurred. Inspect error.code.
            setPageMessage(error);
          });
        // login(auth.user.uid);
        if (auth) {
        }
      })
      .catch((error) => setPageMessage(error.message));
  };

  return !submitted ? (
    <div className="login">
      <div className="login__container">
        <h1>New User</h1>
        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword1(e.target.value)}
          />
          <br></br>
          <br></br>
          <br></br>
          <input
            type="password"
            placeholder=" Confirm password"
            onChange={(e) => setPassword2(e.target.value)}
          />
          <br></br>
          <br></br>
          <button type="submit" onClick={register}>
            Register
          </button>
        </form>
        {pageMessage && <h2>{pageMessage}</h2>}
      </div>
    </div>
  ) : (
    <h1>Please verify email in your email inbox</h1>
  );
};

const mapDispatchToProps = (dispatch) => ({
  login: (uid) => dispatch(login(uid)),
});

export default connect(undefined, mapDispatchToProps)(NewUserCreation);
