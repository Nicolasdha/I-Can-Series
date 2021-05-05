import React from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { startLogout, logout } from "../actions/auth";
import { wipeCharacters } from "../actions/character";
import { emptyBasket } from "../actions/basket";

const Header = ({ startLogout, wipeCharacters, emptyBasket, logout }) => {
  return (
    <div>
      <Link to="/">Login</Link>
      <button
        onClick={() => {
          wipeCharacters();
          startLogout();
          logout();
          emptyBasket();
        }}
      >
        LOGOUT
      </button>
      <Link to="/userProfile">Profile</Link>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout()),
  logout: () => dispatch(logout()),
  wipeCharacters: () => dispatch(wipeCharacters()),
  emptyBasket: () => dispatch(emptyBasket()),
});
export default connect(undefined, mapDispatchToProps)(Header);
