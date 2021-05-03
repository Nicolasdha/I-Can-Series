import React from "react";
import { Link } from "react-router-dom";

import logo from "../images/logo.svg";
// import "../styles/App.css";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <Link to="/dashboard" style={{ color: "white" }}>
            Go Dash
          </Link>
        </p>
      </header>
    </div>
  );
};

export default App;

{
  /* <a
className="App-link"
href="https://reactjs.org"
target="_blank"
rel="noopener noreferrer"
>
Learn React
</a> */
}
