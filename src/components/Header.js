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
  user,
}) => {
  return (
    <div className="header">
      <Link className="header--link" to="/dashboard">
        Dashboard
      </Link>
      <Link className="header--link" to="/userProfile">
        Profile
      </Link>

      {user.uid ? (
        <Link
          className="header--link"
          onClick={() => {
            wipeCharacters();
            wipeOrders();
            startLogout();
            logout();
            emptyBasket();
          }}
        >
          Logout
        </Link>
      ) : (
        <Link className="header--link" to="/">
          Login
        </Link>
      )}
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

const mapStoreToProps = (state, props) => ({
  user: state.authentication,
});

export default connect(mapStoreToProps, mapDispatchToProps)(Header);
