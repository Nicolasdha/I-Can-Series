import "core-js/stable";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";
import { Provider } from "react-redux";
import * as serviceWorkerRegistration from "./serviceWorker/serviceWorkerRegistration";
import reportWebVitals from "./analytics/reportWebVitals";

import "./styles/styles.scss";
import AppRouter, { history } from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import { auth, firebase } from "./firebase/firebase";
import { login, logout } from "./actions/auth";
import LoadingPage from "./components/LoadingPage";

const store = configureStore();

const jsx = (
  <React.StrictMode>
    <Provider store={store}>{AppRouter}</Provider>
  </React.StrictMode>
);

ReactDOM.render(<LoadingPage />, document.getElementById("root"));

let hasRendered = false;

const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById("root"));
    hasRendered = true;
  }
};
renderApp();

firebase.auth().onAuthStateChanged((user) => {
  console.log("THIS IS THE USER >>>>", user);
  if (user) {
    store.dispatch(login(user.uid));
    // store.dispatch(startSetExpenses()).then(()=>{
    renderApp();
    if (history.location.pathname === "/") {
      history.push("/dashboard");
    }
    //});
  } else {
    renderApp();
    store.dispatch(logout());
    history.push("/");
  }
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

//UNCOMMENT THIS IN PRODUCTION OR IF WANT TO USE ANALYTICS
// reportWebVitals();
