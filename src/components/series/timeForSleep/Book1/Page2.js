import React from "react";
import { connect } from "react-redux";

const Page2 = (props) => {
  return (
    <div>
      <h1> I can get ready for bed and go to sleep. </h1>
      <p>
        {props.activeCharacter?.nickname}I can get in bed and get tucked in. I
        can go to sleep. I CAN get ready for bed and go to sleep!
      </p>
    </div>
  );
};

const mapStoreToProps = (state, props) => ({
  state,
  activeCharacter: state.character.activeCharacter,
});

export default connect(mapStoreToProps, undefined)(Page2);
