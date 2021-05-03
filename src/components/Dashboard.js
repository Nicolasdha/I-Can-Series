import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Character from "./Character";
import {
  startReadCharacters,
  startRemoveCharacter,
} from "../actions/character";

function Dashboard(props) {
  //THIS IN USEEFFECT

  useEffect(() => {
    props.startReadCharacters();
  }, []);

  const removeCharacter = (e) => {
    props.startRemoveCharacter(e.target.value);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/characterSelection"> Create character</Link>

      {props.stateCharacters.characters?.map((each, index) => {
        return (
          <div key={index}>
            <Character key={index + 100} character={each} />
            <Link to={`/edit/${each.nickname}`}>
              <button>Edit</button>
            </Link>
            <button value={each.id} onClick={removeCharacter}>
              Remove
            </button>
          </div>
        );
      })}

      <Link to="/purchase">
        <h2>Books to buy</h2>
      </Link>

      <Link to="/login"> Go lgin</Link>
    </div>
  );
}

const mapStoreToProps = (state, props) => ({
  stateCharacters: state.character,
});

const mapDispatchToProps = (dispatch) => ({
  startReadCharacters: () => dispatch(startReadCharacters()),
  startRemoveCharacter: (id) => dispatch(startRemoveCharacter(id)),
});

export default connect(mapStoreToProps, mapDispatchToProps)(Dashboard);
