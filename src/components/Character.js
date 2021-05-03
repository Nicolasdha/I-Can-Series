import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { startSetActiveCharacter } from "../actions/character";

const Character = ({ character, startSetActiveCharacter }) => {
  const startSetActiveCharacterClick = (e) => {
    startSetActiveCharacter(character);
    // history.push("/BookSelection");
  };

  return (
    <div>
      <Link to="/bookSelection">
        <p onClick={startSetActiveCharacterClick}>{character.nickname}</p>
      </Link>
    </div>
  );
};

// name clickable for books?
// const mapStoreToProps = (state, props) => ({
//   characters: state.character,
// });

const mapDispatchToProps = (dispatch) => ({
  startSetActiveCharacter: (character) =>
    dispatch(startSetActiveCharacter(character)),
});

export default connect(undefined, mapDispatchToProps)(Character);
