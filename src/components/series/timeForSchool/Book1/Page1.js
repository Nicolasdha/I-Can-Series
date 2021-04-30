import React from "react";
import { connect } from "react-redux";

const Page1 = (props) => {
  console.log(props);
  return (
    <div>
      <h1> I can get ready for bed and go to SCHOOL. </h1>
      <p>
        I can stop playing. I can brush my teeth. I can get washed up. I can get
        my hair brushed. I can get my pajamas on.
      </p>
    </div>
  );
};

const mapStoreToProps = (state, props) => ({
  characters: state.character,
});

export default connect(mapStoreToProps, undefined)(Page1);
