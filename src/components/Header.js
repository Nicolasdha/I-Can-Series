import React from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { logout } from "../actions/auth";

const Header = ({ logout }) => {
  return (
    <div>
      <Link to="/login">Login</Link>
      <button
        onClick={() => {
          logout();
        }}
      >
        LOGOUT
      </button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(undefined, mapDispatchToProps)(Header);
