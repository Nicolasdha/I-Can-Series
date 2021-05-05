import React, { useState } from "react";
import { auth } from "../firebase/firebase";
import { useHistory } from "react-router-dom";

const ResetPass = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [pageMessage, setPageMessage] = useState(false);
  const resetPassword = (e) => {
    e.preventDefault();
    auth
      .sendPasswordResetEmail(email)
      .then((link) => {
        setPageMessage(
          "Please check email and follow link. You will auto directed back to home page"
        );
        setTimeout(() => {
          history.push("/");
        }, 5000);
        console.log(link);
      })
      .catch((error) => {
        // Some error occurred.
        setPageMessage("No user by that email");
        console.log(error);
      });
  };

  return (
    <div className="login">
      <div className="login__container">
        <h1>Forgot Password</h1>
        <h5>E-mail</h5>
        <form onSubmit={resetPassword}>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Reset Password</button>
        </form>
        {pageMessage && <h2>{pageMessage}</h2>}
      </div>
    </div>
  );
};

export default ResetPass;
