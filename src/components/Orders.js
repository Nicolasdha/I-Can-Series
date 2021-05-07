import React from "react";
import { connect } from "react-redux";

import { startSetOrders } from "../actions/orders";

const Orders = ({ startSetOrders }) => {
  startSetOrders();
  return <div>orders</div>;
};

const mapDispatchToProps = (dispatch) => ({
  startSetOrders: () => dispatch(startSetOrders()),
});

export default connect(undefined, mapDispatchToProps)(Orders);
