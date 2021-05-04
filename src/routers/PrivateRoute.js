import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Header from "../components/Header";

export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    component={(props) =>
      isAuthenticated ? (
        <div>
          <Component {...props} />
        </div>
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

const mapStoreToProps = (state) => ({
  isAuthenticated: state.authentication.uid ? true : false,
  // isAuthenticated: !!state.authentication.uid
});

export default connect(mapStoreToProps)(PrivateRoute);
