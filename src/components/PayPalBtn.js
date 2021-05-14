import React from "react";
import { PayPalButton } from "react-paypal-button-v2";

const PayPalBtn = (props) => {
  const {
    amount,
    currency,
    createSubscription,
    onApprove,
    catchError,
    onError,
    onCancel,
  } = props;
  const paypalKey = "P-6D95325839119752TMCOLDJY";
  return (
    <div>
      <PayPalButton
        amount={amount}
        currency={currency}
        createSubscription={(data, details) =>
          createSubscription(data, details)
        }
        onApprove={(data, details) => onApprove(data, details)}
        onError={(err) => onError(err)}
        catchError={(err) => catchError(err)}
        onCancel={(err) => onCancel(err)}
        options={{
          clientId: paypalKey,
          vault: true,
        }}
        style={{
          shape: "rect",
          color: "blue",
          layout: "horizontal",
          label: "subscribe",
        }}
      />
    </div>
  );
};

export default PayPalBtn;
// window.paypal
//       .Buttons({
//         style: {
//           shape: "pill",
//           color: "blue",
//           layout: "vertical",
//           label: "subscribe",
//         },
//         createSubscription: function (data, actions) {
//           return actions.subscription.create({
//             /* Creates the subscription */
//             plan_id: "P-6D95325839119752TMCOLDJY",
//           });
//         },
//         onApprove: function (data, actions) {
//           alert(data.subscriptionID); // You can add optional success message for the subscriber here
//         },
//       })
//       .render("#paypal-button-container-P-6D95325839119752TMCOLDJY"); // Renders the PayPal button
