import React, { useState } from "react";

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

export const LoginPage = ({
  login,
  startLoginGoogle,
  startLoginFacebook,
  startLoginTwitter,
}) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

        <button className="button button--login" onClick={startLoginGoogle}>
          <img className="button__image" src="{googleLogo}" />
          Login with Google
        </button>

        <button className="button button--login" onClick={startLoginFacebook}>
          <img className="button__image" src="/images/facebookLogo.png" />
          Login with Facebook
        </button>

        <button className="button button--login" onClick={startLoginTwitter}>
          <img className="button__image" src="/images/twitterLogo.png" />
          Login with Twitter
        </button>
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

{
  /* onClick={startLoginGoogle}*/
}
// onClick={startLoginFacebook}
//onClick={startLoginTwitter}

{
  /* <div className="box-layout">
    <h1 className="title">
      O<span>verhea</span>d
    </h1>

    <div className="box-layout__background">
      <div className="box-layout__box">
        {/* <h1 className="box-layout__title">Overhead</h1>
        <p className="box-layout__subtitle">Track your expenses</p>
        <hr className="box-layout--hr"></hr>
    
        <button className="button button--login">
          <img className="button__image" src="/images/googleLogo.png" />
          Login with Google
        </button>
        <hr className="button--hr"></hr>

        <button className="button button--login">
          <img className="button__image" src="/images/facebookLogo.png" />
          Login with Facebook
        </button>
        <hr className="button--hr"></hr>

        <button className="button button--login">
          <img className="button__image" src="/images/twitterLogo.png" />
          Login with Twitter
        </button>
      </div>
    </div>
  </div> */
}
