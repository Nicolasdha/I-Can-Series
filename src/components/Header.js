import React from "react";
import { Link } from "react-router-dom";
import PersonIcon from "@material-ui/icons/Person";
import HomeIcon from "@material-ui/icons/Home";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
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
      <div className="header__top">
        <p className="header__top--details">
          <PersonIcon style={{ fontSize: 35 }} />I Can Series
        </p>
      </div>

      <div className="header__body">
        <Link className="header--link" to="/dashboard">
          <HomeIcon style={{ fontSize: 35 }} />
          Dashboard
        </Link>
        <Link className="header--link" to="/userProfile">
          <AccountCircleIcon style={{ fontSize: 35 }} />
          Profile
        </Link>

        {user.uid ? (
          <Link
            to="/"
            className="header--link"
            onClick={() => {
              wipeCharacters();
              wipeOrders();
              startLogout();
              logout();
              emptyBasket();
            }}
          >
            <ExitToAppIcon style={{ fontSize: 35 }} />
            Logout
          </Link>
        ) : (
          <Link className="header--link" to="/">
            Login
          </Link>
        )}
      </div>
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
