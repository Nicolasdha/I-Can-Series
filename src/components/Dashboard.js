import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Character from "./Character";
import {
  startReadCharacters,
  startRemoveCharacter,
} from "../actions/character";

import { startSetOrders } from "../actions/orders";
import LoadingPage from "./LoadingPage";

function Dashboard(props) {
  const [render, setRender] = useState(false);

  useEffect(() => {
    const setProfile = async () => {
      // //Database limit on three rewrites ASAP I think every thrid one is not happening

      await props.startReadCharacters();
      await props.startSetOrders();
      setRender(true);
    };
    setProfile();
    // props.startSetOrders();
  }, []);

  const removeCharacter = (e) => {
    props.startRemoveCharacter(e.target.value);
  };

  return (
    <div>
      {render ? (
        <div>
          <h1>Dashboard</h1>
          <Link to="/characterSelection"> Create character</Link>

          {props.stateCharacters.characters?.map((each, index) => {
            return (
              <div key={index}>
                <Character key={index + 100} character={each} />
                <Link to={`/edit/${each.nickname}`}>
                  <button>Edit</button>
                </Link>
                <button value={each.id} onClick={removeCharacter}>
                  Remove
                </button>
              </div>
            );
          })}

          <Link to="/purchase">
            <h2>Books to buy</h2>
          </Link>

          <Link to="/login"> Go lgin</Link>
        </div>
      ) : (
        <LoadingPage />
      )}
    </div>
  );
}

const mapStoreToProps = (state, props) => ({
  stateCharacters: state.character,
});

const mapDispatchToProps = (dispatch) => ({
  startReadCharacters: () => dispatch(startReadCharacters()),
  startSetOrders: () => dispatch(startSetOrders()),
  startRemoveCharacter: (id) => dispatch(startRemoveCharacter(id)),
  startSetOrders: () => dispatch(startSetOrders()),
});

export default connect(mapStoreToProps, mapDispatchToProps)(Dashboard);

// return (

// );
