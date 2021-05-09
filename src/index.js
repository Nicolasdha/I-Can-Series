import "core-js/stable";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";
import { Provider } from "react-redux";
import * as serviceWorkerRegistration from "./serviceWorker/serviceWorkerRegistration";
import reportWebVitals from "./analytics/reportWebVitals";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import "./styles/styles.scss";
import AppRouter, { history } from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import { auth, firebase } from "./firebase/firebase";
import { login, logout } from "./actions/auth";
import LoadingPage from "./components/LoadingPage";
import { startReadCharacters } from "./actions/character";

import { startSetOrders } from "./actions/orders";
const store = configureStore();

const promise = loadStripe(
  "pk_test_51InSTbLFkWX2uXtIaZFhkPe2jaq1jR4ZZMGDHyeCBuoiqOvHTc7wIgDByYId3XZZgaMc54pjW26yNF4tt02ZfXiO002BJqMF0t"
);

const jsx = (
  <React.StrictMode>
    <Provider store={store}>
      <Elements stripe={promise}>{AppRouter}</Elements>
    </Provider>
  </React.StrictMode>
);

console.log("hellow");

ReactDOM.render(<LoadingPage />, document.getElementById("root"));

let hasRendered = false;

const setProfile = async () => {
  // WHY IS THIS EVEN HERE? CANT READ THE STUFF UNTIL THERES A USER, originally did so dashboard didnt re read everytime
  // await store.dispatch(startReadCharacters());
  // await store.dispatch(startSetOrders());
};

const renderApp = async () => {
  if (!hasRendered) {
    await setProfile();
    ReactDOM.render(jsx, document.getElementById("root"));
    hasRendered = true;
  }
};

firebase.auth().onAuthStateChanged((user) => {
  console.log("THIS IS THE USER >>>>", user);

  if (user?.providerData[0].providerId === "password") {
    if (user.emailVerified) {
      console.log("THIS ");
      // store.dispatch(login(user.uid, user));
      renderApp();
      if (history.location.pathname === "/") {
        history.push("/dashboard");
      } else {
        console.log("PISS ");
        // renderApp();
        // store.dispatch(logout());
        // history.push("/");
      }
    }
  } else {
    if (user) {
      store.dispatch(login(user.uid, user));
      console.log("THAT ");
      renderApp();
      if (history.location.pathname === "/") {
        history.push("/dashboard");
      }
      // store.dispatch(startSetExpenses()).then(()=>{
      //});
    } else {
      console.log("FUCK ");
      renderApp();
      // store.dispatch(logout());
      // history.push("/");
    }
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
