import React, { useEffect } from "react";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

import axios, { paypalStart } from "../axios/axios";
import { database } from "../firebase/firebase";
import { startClearBearerTokenRedux } from "../actions/bearerToken";

toast.configure();

const PaymentComplete = ({ bearerToken, startClearBearerTokenRedux, user }) => {
  useEffect(() => {
    const authorize = async () => {
      const newBasket = [];

      await database
        .collection("users")
        .doc(user.uid)
        .collection("basket")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            let token = doc.data();
            newBasket.push(token);
          });
        });
      let args = window.location.search.slice(7, 24);
      console.log(args);

      const response = await axios.post(`/v2/checkout/orders/${args}/capture`, {
        bearerToken,
      });
      console.log("🥶 jimjam", response);
      if ((response.status = 201)) {
        console.log("🥶", newBasket);

        await database
          .collection("users")
          .doc(user.uid)
          .collection("orders")
          .doc(response.data.purchase_units[0].payments.captures[0].id)
          .set({
            paymentMethod: "PayPal One Time",
            basket: newBasket[0].basket,
            amount:
              response.data.purchase_units[0].payments.captures[0].amount.value,
            created:
              response.data.purchase_units[0].payments.captures[0].create_time,
            payer: response.data.payer,
          });

        toast("Success! Please visit the Dashboard to get reading!", {
          type: "success",
        });
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
  user: state.authentication,
});

const mapDispatchToProps = (dispatch) => ({
  startClearBearerTokenRedux: () => dispatch(startClearBearerTokenRedux()),
});

export default connect(mapStoreToProps, mapDispatchToProps)(PaymentComplete);
