import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Page1 = (props) => {
  console.log(props);
  return (
    <div>
      <h1> I can get ready for bed and go to sleep. </h1>
      <p>
        {props.activeCharacter?.nickname}I can stop playing. I can brush my
        teeth. I can get washed up. I can get my hair brushed. I can get my
        pajamas on.
      </p>
      <Link to="/timeForSleep/book1/Page2">
        <button>Next Page</button>
      </Link>
    </div>
  );
};

const mapStoreToProps = (state, props) => ({
  state,
  activeCharacter: state.character.activeCharacter,
});

export default connect(mapStoreToProps, undefined)(Page1);
