import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Character from "./Character";

function Dashboard(props) {
  console.log("character", props.characters);
  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/characterSelection"> Create character</Link>

      {props.characters.map((each, index) => (
        <Character character={each} key={index} />
      ))}

      <Link to="/purchase">
        <h2>Books to buy</h2>
      </Link>

      <Link to="/login"> Go lgin</Link>
    </div>
  );
}

const mapStoreToProps = (state, props) => ({
  characters: state.character,
});

export default connect(mapStoreToProps, undefined)(Dashboard);
