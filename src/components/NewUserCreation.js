import React, { useState } from "react";

import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { auth, firebase } from "../firebase/firebase";
import { login } from "../actions/auth";
import {
  startLoginGoogle,
  startLoginFacebook,
  startLoginTwitter,
} from "../actions/auth";

import googleLogo from "../images/googleLogo.png";
import facebookLogo from "../images/facebookLogo.png";

export const NewUserCreation = ({
  login,
  startLoginGoogle,
  startLoginFacebook,
}) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [pageMessage, setPageMessage] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  let section = document.querySelectorAll("li");
  console.log(section.length);
  // function toggleAccordion() {
  //   section.removeClass("active");
  //   section.addClass("active");
  // }
  // section.addEventListener("click", toggleAccordion);

  const register = async (e) => {
    e.preventDefault();
    if (password1 !== password2) {
      setPageMessage("Passwords do not match");
      return;
    }

    const x = document.getElementById("recaptcha");
    x.className = "show";

    try {
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        "recaptcha",
        {
          callback: async (response) => {
            await auth
              .createUserWithEmailAndPassword(
                email.toLowerCase().trim(),
                password1
              )
              .then((auth1) => {
                // Success
                const fullName = `${firstName} ${lastName}`;
                auth1.user.updateProfile({
                  displayName: fullName,
                });

                console.log(auth1);
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
              })
              .catch((error) => setPageMessage(error.message));
          },
          "expired-callback": () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            // ...
          },
        }
      );
      window.recaptchaVerifier.render();
    } catch (error) {
      console.log(error.message);
      setPageMessage(`Please verify reCAPTCHA`);
    }
  };

  const facebookLogin = async () => {
    try {
      const facebook1 = await startLoginFacebook();
      history.push("/dashboard");
    } catch (error) {
      setPageMessage(
        `An account already exists with the same email address but different sign-in credentials. Sign out on Facebook.com, and sign back in to your profile using this application.`
      );
    }
  };

  const googleLogin = async () => {
    try {
      await startLoginGoogle();
      history.push("/dashboard");
    } catch (error) {
      setPageMessage(error);
    }
  };

  return !submitted ? (
    <div className="newUser">
      <div className="login__container">
        <div id="recaptcha"></div>
        <h1>New User</h1>

        {pageMessage && (
          <p className="login__error--message ">
            <em>{pageMessage}</em>
          </p>
        )}
      </div>

      <details>
        <summary>
          Register with <strong>Email</strong>
        </summary>
        <div className="content">
          <form>
            <h5>First Name</h5>
            <input
              className="login__input"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <h5>Last Name</h5>
            <input
              className="login__input"
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <h5>E-mail</h5>
            <input
              className="login__input"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <h5>Password</h5>
            <input
              className="login__input"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword1(e.target.value)}
            />
            <input
              className="login__input"
              type="password"
              placeholder=" Confirm password"
              onChange={(e) => setPassword2(e.target.value)}
            />
            <button
              className="login__signInButton"
              type="submit"
              onClick={register}
            >
              Register
            </button>
          </form>
        </div>
      </details>

      <details>
        <summary>
          Register with <strong>Google</strong>
        </summary>
        <div className="content">
          <button className="newUser__signInButton" onClick={googleLogin}>
            <img className="newUser__image" src={googleLogo} />
            Sign up with Google
          </button>
        </div>
      </details>

      <details>
        <summary>
          Register with <strong>Facebook</strong>
        </summary>
        <div className="content">
          <button className="newUser__signInButton" onClick={facebookLogin}>
            <img className="newUser__image" src={facebookLogo} />
            Sign up with Facebook
          </button>
        </div>
      </details>
    </div>
  ) : (
    <h1>Please verify email in your email inbox</h1>
  );
};

const mapDispatchToProps = (dispatch) => ({
  startLoginGoogle: () => dispatch(startLoginGoogle()),
  startLoginFacebook: () => dispatch(startLoginFacebook()),
  startLoginTwitter: () => dispatch(startLoginTwitter()),
});

export default connect(undefined, mapDispatchToProps)(NewUserCreation);
