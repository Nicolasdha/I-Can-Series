import React from "react";
import { connect } from "react-redux";

import CharacterSelection from "./CharacterSelection";

const EditCharacter = ({ characters }) => {
  let nickname = window.location.pathname.toString();
  const match = characters.characters?.find(
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
});

export default connect(mapStoreToProps, undefined)(EditCharacter);
