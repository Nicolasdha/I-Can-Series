import React from "react";
import { connect } from "react-redux";

import CharacterSelection from "./CharacterSelection";

const EditCharacter = ({ characters }) => {
  let nickname = window.location.pathname.toString();
  console.log(nickname.replace(/\/(edit)\//, ""));
  const match = characters.find(
    (each) => each.nickname === nickname.replace(/\/(edit)\//, "")
  );

  return (
    <div>
      <CharacterSelection match={match} />
    </div>
  );
};

const mapStoreToProps = (state, props) => ({
  characters: state.character,
  // match: state.character.find((each) => each.nickname === )
});

export default connect(mapStoreToProps, undefined)(EditCharacter);
