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
  const [ordersIdState, setordersIdState] = useState([]);
  const orders = [];

  useEffect(() => {
    props.startReadCharacters();
    props.startSetOrders();
  }, []);

  //
  //Database limit on three rewrites ASAP I think
  setTimeout(() => {
    setRender(true);
  }, 0);

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
          <br></br>
          {props.orders[1]?.orderIds.map((each, index) => (
            <p key={index}>{each}</p>
          ))}
        </div>
      ) : (
        <LoadingPage />
      )}
    </div>
  );
}

const mapStoreToProps = (state, props) => ({
  stateCharacters: state.character,
  orders: state.orders,
});

const mapDispatchToProps = (dispatch) => ({
  startReadCharacters: () => dispatch(startReadCharacters()),
  startSetOrders: () => dispatch(startSetOrders()),
  startRemoveCharacter: (id) => dispatch(startRemoveCharacter(id)),
});

export default connect(mapStoreToProps, mapDispatchToProps)(Dashboard);

// return (

// );
