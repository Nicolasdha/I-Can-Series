import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// Icons
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import PersonIcon from "@material-ui/icons/Person";
import FaceIcon from "@material-ui/icons/Face";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import HomeIcon from "@material-ui/icons/Home";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SpaIcon from "@material-ui/icons/Spa";
import MenuBookIcon from "@material-ui/icons/MenuBook";
//Local
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
          <SpaIcon style={{ fontSize: 35 }} />
          The I Can Series!
        </p>
      </div>

      <div className="header__body">
        <div className="header__body--top">
          <Link className="header--link" to="/dashboard">
            <HomeIcon style={{ fontSize: 35 }} />
            Dashboard
          </Link>
          <Link className="header--link" to="/characterSelection">
            <FaceIcon style={{ fontSize: 35 }} /> Create Character
          </Link>
          <Link className="header--link" to="/purchase">
            <MenuBookIcon style={{ fontSize: 35 }} />
            Books to buy
          </Link>
        </div>

        <div className="header__body--bottom">
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
