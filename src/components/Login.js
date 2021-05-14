import React, { useState } from "react";

import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import PersonIcon from "@material-ui/icons/Person";

import { auth } from "../firebase/firebase";
import {
  login,
  startLoginGoogle,
  startLoginFacebook,
  startLoginTwitter,
} from "../actions/auth";
import { startSetOrders } from "../actions/orders";

import googleLogo from "../images/googleLogo.png";
import facebookLogo from "../images/facebookLogo.png";

export const LoginPage = ({
  login,
  startLoginGoogle,
  startLoginFacebook,
  startLoginTwitter,
  startSetOrders,
}) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInError, setSignInError] = useState(false);

  const signIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email.toLowerCase().trim(), password)
      .then((authUser) => {
        if (authUser.user.emailVerified) {
          login(authUser.user.uid, authUser.user);
          startSetOrders();

          history.push("/dashboard");
          return;
        } else {
          setSignInError("Please verify email");
          return;
        }
      })
      .catch((error) => {
        setSignInError("Password incorrect, or user exists with that email");
        console.log(error);
        // alert(error.message);
      });
  };

  const resetPassword = () => {
    history.push("/reset");
  };

  return (
    <div className="login">
      <div className="login__container">
        <h1>Sign-in</h1>
        <form>
          <h5>E-mail</h5>
          <input
            className="login__input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>Password</h5>
          <input
            className="login__input"
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
          {signInError && <h2>{signInError}</h2>}
        </form>
        <button
          className="login__signInButton"
          onClick={() => {
            history.push("/createNewUser");
          }}
        >
          <PersonIcon className="loginButton__image" />
          New User Creation?
        </button>
        <button className="login__signInButton" onClick={startLoginGoogle}>
          <img className="loginButton__image" src={googleLogo} />
          Login with Google
        </button>
        <button className="login__signInButton" onClick={startLoginFacebook}>
          <img className="loginButton__image" src={facebookLogo} />
          Login with Facebook
        </button>
        {/* <button className="button button--login" onClick={startLoginTwitter}>
          <img className="button__image" src="/images/twitterLogo.png" />
          Login with Twitter
        </button> */}
        <button
          className="login__signInButton login__signInButton--forgot"
          onClick={resetPassword}
        >
          <em>Forgot Password</em>
        </button>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  login: (uid, user) => dispatch(login(uid, user)),
  startLoginGoogle: () => dispatch(startLoginGoogle()),
  startLoginFacebook: () => dispatch(startLoginFacebook()),
  startLoginTwitter: () => dispatch(startLoginTwitter()),
  startSetOrders: () => dispatch(startSetOrders()),
});

export default connect(undefined, mapDispatchToProps)(LoginPage);

//Updating passowrd
// firebase.auth()
//         .signInWithEmailAndPassword('email', 'oldPassword')
//         .then(function(user) {

//             firebase.auth().currentUser.updatePassword('newPassword').then(function(){

//                 //Do something

//             }).catch(function(err){
//                 //Do something
//             });

//         }).catch(function(err){
//             //Do something
//         });

// if (user) {
//   database
//     .collection("users")
//     .doc(user.uid)
//     .collection("orders")
//     .orderBy("created", "desc")
//     .onSnapshot((snapshot) => {
//       setOrders(
//         snapshot.docs.map((doc) => ({
//           id: doc.id,
//           data: doc.data(),
//         }))
