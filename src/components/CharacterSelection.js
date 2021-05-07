import { useState } from "react";
import { history } from "../routers/AppRouter";
import { v4 as uuidv4 } from "uuid";

import { connect } from "react-redux";
import { startCreateCharacter, startEditCharacter } from "../actions/character";

// const v4options = {
//   random: [0x91],
// };
const CharacterSelection = ({
  match,
  startCreateCharacter,
  startEditCharacter,
}) => {
  const [gender, setGender] = useState(match.gender || "");
  const [ethnicity, setEthnicity] = useState(match.ethnicity || "");
  const [passion, setPassion] = useState(match.passion || "");
  const [nickname, setNickname] = useState(match.nickname || "");
  const onSubmit = (e) => {
    e.preventDefault();
    if (gender && ethnicity && passion && nickname) {
      // if (match.gender) {
      //   startEditCharacter({
      //     gender,
      //     ethnicity,
      //     passion,
      //     nickname,
      //     id: match.id,
      //   });
      //   history.push("/dashboard");
      //   return;
      // }
      startCreateCharacter({
        gender,
        ethnicity,
        passion,
        nickname,
        id: match.gender ? match.id : uuidv4(),
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
        <select
          onChange={genderChange}
          id="gender"
          name="gender"
          value={gender}
        >
          <option>-- Select Gender --</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <label htmlFor="ethnicity">Choose an Ethnicity:</label>
        <select
          onChange={ethnicityChange}
          id="ethnicity"
          name="ethnicity"
          value={ethnicity}
        >
          <option>-- Select Ethnicity --</option>
          <option value="cauc">Caucasian</option>
          <option value="AA">African-American</option>
          <option value="asian">Asian</option>
        </select>

        <label htmlFor="passion">Choose a Passion:</label>
        <select
          onChange={passionChange}
          id="passion"
          name="passion"
          value={passion}
        >
          <option value="">-- Select Passion --</option>
          <option value="dino">dino</option>
          <option value="cars">Cars</option>
          <option value="animals">Animals</option>
          <option value="dolls">Dolls</option>
        </select>

        <input
          onChange={nicknameChange}
          value={nickname}
          placeholder="Choose Nickname"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  startCreateCharacter: (character) =>
    dispatch(startCreateCharacter(character)),
  startEditCharacter: (updates) => dispatch(startEditCharacter(updates)),
});

export default connect(undefined, mapDispatchToProps)(CharacterSelection);
