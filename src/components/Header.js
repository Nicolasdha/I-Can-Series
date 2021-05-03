import React from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { startLogout } from "../actions/auth";

const Header = ({ startLogout }) => {
  return (
    <div>
      <Link to="/">Login</Link>
      <button
        onClick={() => {
          startLogout();
        }}
      >
        LOGOUT
      </button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout()),
});
export default connect(undefined, mapDispatchToProps)(Header);
