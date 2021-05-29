import React, { useEffect } from "react";
import { connect } from "react-redux";
import axios, { paypalStart } from "../axios/axios";
import { ToastContainer, toast } from "react-toastify";

import { startClearBearerTokenRedux } from "../actions/bearerToken";

toast.configure();

const PaymentComplete = ({ bearerToken, startClearBearerTokenRedux }) => {
  useEffect(() => {
    const authorize = async () => {
      let args = window.location.search.slice(7, 24);
      console.log(args);

      const response = await axios.post(`/v2/checkout/orders/${args}/capture`, {
        bearerToken,
      });
      if ((response.status = 201)) {
        toast("Success! Please visit the Dashboard to get reading!", {
          type: "success",
        });
        console.log("poooopooooo", bearerToken);
        startClearBearerTokenRedux(bearerToken);
        // Need FBDB information here
      }
    };
    authorize();
  }, []);

  return <div>payment compelte</div>;
};

const mapStoreToProps = (state, props) => ({
  bearerToken: state.bearerToken?.bearerToken,
});

const mapDispatchToProps = (dispatch) => ({
  startClearBearerTokenRedux: () => dispatch(startClearBearerTokenRedux()),
});

export default connect(mapStoreToProps, mapDispatchToProps)(PaymentComplete);
