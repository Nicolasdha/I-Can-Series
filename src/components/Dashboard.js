import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Character from "./Character";

function Dashboard(props) {
  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/characterSelection"> Create character</Link>

      {props.characters.map((each, index) => {
        console.log(index, "index");
        return (
          <div key={index}>
            <Character character={each} />
            <Link to={`/edit/${each.nickname}`}>
              <button>Edit</button>
            </Link>
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
  characters: state.character,
});

export default connect(mapStoreToProps, undefined)(Dashboard);
