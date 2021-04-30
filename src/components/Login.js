import React from "react";
// import {startLoginGoogle, startLoginFacebook, startLoginTwitter} from '../actions/auth'
import { connect } from "react-redux";

// export const LoginPage = ({ startLoginGoogle, startLoginFacebook, startLoginTwitter }) => (
export const LoginPage = () => (
  <div className="box-layout">
    <h1 className="title">
      O<span>verhea</span>d
    </h1>

    <div className="box-layout__background">
      <div className="box-layout__box">
        {/* <h1 className="box-layout__title">Overhead</h1> */}
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
  </div>
);

// const mapDispatchToProps = (dispatch) => ({
//     startLoginGoogle: () => dispatch(startLoginGoogle()),
//     startLoginFacebook: () => dispatch(startLoginFacebook()),
//     startLoginTwitter: () => dispatch(startLoginTwitter()),

// });

export default connect(undefined, undefined)(LoginPage);
{
  /* onClick={startLoginGoogle}*/
}
// onClick={startLoginFacebook}
//onClick={startLoginTwitter}
