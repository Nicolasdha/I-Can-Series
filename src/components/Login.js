import React, { useState } from "react";
import * as admin from "firebase-admin";

import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase/firebase";
import {
  login,
  startLoginGoogle,
  startLoginFacebook,
  startLoginTwitter,
} from "../actions/auth";
// import {startLoginGoogle, startLoginFacebook, startLoginTwitter} from '../actions/auth'

// export const LoginPage = ({ startLoginGoogle, startLoginFacebook, startLoginTwitter }) => (

const googleLogo = "../images/googleLogo.png";

const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for
  // this URL must be whitelisted in the Firebase Console.
  url: "http://localhost:3000/dashboard",
  // This must be true for email link sign-in.
  handleCodeInApp: true,
  iOS: {
    bundleId: "com.example.ios",
  },
  android: {
    packageName: "com.example.android",
    installApp: true,
    minimumVersion: "12",
  },
  // FDL custom domain.
  dynamicLinkDomain: "http://localhost:3000/dashboard",
};

export const LoginPage = ({
  login,
  startLoginGoogle,
  startLoginFacebook,
  startLoginTwitter,
}) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);

    auth
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

  const register = (e) => {
    e.preventDefault();
    console.log(password);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        // Success
        console.log(auth);
        login(auth.user.uid);
        if (auth) {
          history.push("/");
        }
      })
      .catch((error) => alert(error.message));
  };

  const resetPassword = (e) => {
    admin
      .auth()
      .generatePasswordResetLink(email, actionCodeSettings)
      .then((link) => {
        // Construct password reset email template, embed the link and send
        // using custom SMTP server.
        console.log(link);
        // return sendCustomPasswordResetEmail(email, displayName, link);
      })
      .catch((error) => {
        // Some error occurred.
      });
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
            onChange={(e) => setEmail(e.target.value)}
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
        <button onClick={register} className="login__registerButton">
          Create your I Can Series Account
        </button>
        <br></br>

        <button className="button button--login" onClick={startLoginGoogle}>
          <img className="button__image" src="{googleLogo}" />
          Login with Google
        </button>
        <br></br>

        <button className="button button--login" onClick={startLoginFacebook}>
          <img className="button__image" src="/images/facebookLogo.png" />
          Login with Facebook
        </button>
        <br></br>

        <button className="button button--login" onClick={startLoginTwitter}>
          <img className="button__image" src="/images/twitterLogo.png" />
          Login with Twitter
        </button>

        <button onClick={resetPassword}>Reset Password</button>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  login: (uid) => dispatch(login(uid)),
  startLoginGoogle: () => dispatch(startLoginGoogle()),
  startLoginFacebook: () => dispatch(startLoginFacebook()),
  startLoginTwitter: () => dispatch(startLoginTwitter()),
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

// Verify email?????
// firebase.auth().currentUser.sendEmailVerification(actionCodeSettings)
//   .then(function() {
//     // Verification email sent.
//   })
//   .catch(function(error) {
//     // Error occurred. Inspect error.code.
//   });

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
