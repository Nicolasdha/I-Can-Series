import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { setActiveCharacter } from "../actions/character";

const Character = ({ character, setActiveCharacter }) => {
  const setActiveCharacterClick = (e) => {
    setActiveCharacter(character);
    // history.push("/BookSelection");
  };

  return (
    <div>
      <Link to="/bookSelection">
        <p onClick={setActiveCharacterClick}>{character.nickname}</p>
      </Link>
    </div>
  );
};

// name clickable for books?
// const mapStoreToProps = (state, props) => ({
//   characters: state.character,
// });

const mapDispatchToProps = (dispatch) => ({
  setActiveCharacter: (character) => dispatch(setActiveCharacter(character)),
});

export default connect(undefined, mapDispatchToProps)(Character);
