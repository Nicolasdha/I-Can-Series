import React from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { startLogout, logout } from "../actions/auth";
import { wipeCharacters } from "../actions/character";
import { emptyBasket } from "../actions/basket";
import { wipeOrders } from "../actions/orders";

const Header = ({
  startLogout,
  wipeCharacters,
  emptyBasket,
  logout,
  wipeOrders,
}) => {
  return (
    <div>
      <Link to="/">Login</Link>
      <button
        onClick={() => {
          wipeCharacters();
          wipeOrders();
          startLogout();
          logout();
          emptyBasket();
        }}
      >
        LOGOUT
      </button>
      <Link to="/userProfile">Profile</Link>
      {"               "}
      <Link to="/dashboard">Dashboard</Link>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout()),
  logout: () => dispatch(logout()),
  wipeCharacters: () => dispatch(wipeCharacters()),
  emptyBasket: () => dispatch(emptyBasket()),
  wipeOrders: () => dispatch(wipeOrders()),
});
export default connect(undefined, mapDispatchToProps)(Header);
