import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import CurrencyFormat from "react-currency-format";

import getBasketTotal from "../selectors/basketTotal";

const Subtotal = ({ basket }) => {
  const history = useHistory();
  return (
    <div>
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length} items):
              <strong> {value} </strong>
            </p>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
      <button
        onClick={(e) => {
          history.push("/payment");
        }}
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

const mapStoreToProps = (state, props) => ({
  basket: state.basket,
});

export default connect(mapStoreToProps, undefined)(Subtotal);
