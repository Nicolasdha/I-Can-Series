import React, { useEffect } from "react";
import axios, { paypalStart } from "../axios/axios";
import { ToastContainer, toast } from "react-toastify";
toast.configure();
const PaymentComplete = () => {
  useEffect(() => {
    const authorize = async () => {
      console.log(window.location);
      let args = window.location.search.slice(7, 24);
      console.log(args);

      const response = await axios.post(`/v2/checkout/orders/${args}/capture`);
      if ((response.status = 201)) {
        toast("Success! Please visit the Dashboard to get reading!", {
          type: "success",
        });

        // Need FBDB information here
      }
    };
    authorize();
  }, []);

  return <div>payment compelte</div>;
};

export default PaymentComplete;
