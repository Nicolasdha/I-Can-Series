import { useState } from "react";
import { useHistory } from "react-router-dom";

import { connect } from "react-redux";
import { setCharacter } from "../actions/character";
import { Link } from "react-router-dom";

const CharacterSelection = (props) => {
  const history = useHistory();

  const [gender, setGender] = useState(null);
  const [ethnicity, setEthnicity] = useState(null);
  const [passion, setPassion] = useState(null);
  const [nickname, setNickname] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (gender && ethnicity && passion && nickname) {
      console.log(gender, ethnicity, passion, nickname);
      props.setCharacter({
        gender,
        ethnicity,
        passion,
        nickname,
      });
      history.push("/dashboard");
    }
  };

  const genderChange = (e) => {
    setGender(e.target.value);
  };

  const ethnicityChange = (e) => {
    setEthnicity(e.target.value);
  };

  const passionChange = (e) => {
    setPassion(e.target.value);
  };

  const nicknameChange = (e) => {
    setNickname(e.target.value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="gender">Choose a Gender:</label>
        <select onChange={genderChange} id="gender" name="gender">
          <option>-- Select Gender --</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <label htmlFor="ethnicity">Choose an Ethnicity:</label>
        <select onChange={ethnicityChange} id="ethnicity" name="ethnicity">
          <option>-- Select Ethnicity --</option>
          <option value="cauc">Caucasian</option>
          <option value="AA">African-American</option>
          <option value="asian">Asian</option>
        </select>

        <label htmlFor="passion">Choose a Passion:</label>
        <select onChange={passionChange} id="passion" name="passion">
          <option value="">-- Select Passion --</option>
          <option value="dino">dino</option>
          <option value="cars">Cars</option>
          <option value="animals">Animals</option>
          <option value="dolls">Dolls</option>
        </select>

        {/* Prefill value with nickname if editing character */}

        <input
          onChange={nicknameChange}
          value={nickname}
          placeholder="Choose Nickname"
        />
        <button onClick={() => {}} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setCharacter: (character) => dispatch(setCharacter(character)),
});

export default connect(undefined, mapDispatchToProps)(CharacterSelection);
