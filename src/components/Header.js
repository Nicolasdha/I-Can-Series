import React from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { startLogout } from "../actions/auth";
import { wipeCharacters } from "../actions/character";
import { emptyBasket } from "../actions/basket";

const Header = ({ startLogout, wipeCharacters, emptyBasket }) => {
  return (
    <div>
      <Link to="/">Login</Link>
      <button
        onClick={() => {
          wipeCharacters();
          startLogout();
          emptyBasket();
        }}
      >
        LOGOUT
      </button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout()),
  wipeCharacters: () => dispatch(wipeCharacters()),
  emptyBasket: () => dispatch(emptyBasket()),
});
export default connect(undefined, mapDispatchToProps)(Header);
