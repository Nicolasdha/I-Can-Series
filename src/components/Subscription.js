import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import CurrencyFormat from "react-currency-format";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Product from "./Product";
import getBasketTotal from "../selectors/basketTotal";
import axios, { paypalStart } from "../axios/axios";
import { emptyBasket } from "../actions/basket";
import { addOrder, startSetOrders } from "../actions/orders";
import { database } from "../firebase/firebase";
let buttons;

toast.configure();

const Payment = ({ basket, emptyBasket, user, addOrder, startSetOrders }) => {
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();
  const paypal = useRef();
  const paypalSubscription = useRef();

  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabledError, setDisabledError] = useState(true);
  const [disabledClientSecret, setDisabledClientSecret] = useState(true);
  const [succeeded, setsucceeded] = useState(false);
  const [basketSubscription, setBasketSubscription] = useState([]);

  const subscriptionBasket = [
    {
      item: {
        id: "subscription",
        price: 200,
        title: "Subscription",
      },
    },
  ];

  useEffect(() => {
    // const getBearerToken = async () => {
    //   const bearerToken = await axios.post("/v1/oauth2/token");
    //   console.log(bearerToken);
    //   //Want a piece of state for this?
    // };
    // getBearerToken();

    buttons = window.paypal.Buttons({
      style: {
        shape: "pill",
        color: "blue",
        layout: "vertical",
        label: "subscribe",
      },
      createSubscription: function (data, actions) {
        return actions.subscription.create({
          /* Creates the subscription */
          plan_id: "P-6D95325839119752TMCOLDJY",
          intent: "subscription",
        });
      },
      onApprove: async (data, actions, error) => {
        console.log("FUCKNI ERRORRRORRR", error);
        try {
          console.log(data);
          console.log(actions);
          await database
            .collection("users")
            .doc(user.uid)
            .collection("orders")
            .doc(data.subscriptionID)
            .set({
              paymentMethod: "PayPal Subscription",
              basket: [
                {
                  id: "subscription",
                  price: 200,
                  title: "Subscription",
                },
              ],
              amount: 200.0,
              created: new Date(),
              subscriptionID: data.subscriptionID,
            });
          toast("Success! Please visit the Dashboard to get reading!", {
            type: "success",
          });
          startSetOrders();
          emptyBasket();
          window.location.replace("/orders");
        } catch (error) {
          console.log("IMA PIECE OF TOAST", error);
        }
      },
      onCancel: () => {
        toast("Something went wrong", { type: "error" });
      },
      onError: (err) => {
        toast("Something went wrong", { type: "error" });
        console.log("FUCKIN ERROR", err);
      },
    });
    buttons.render("#paypal-button-container-P-6D95325839119752TMCOLDJY");
    console.log("BUTTONS", buttons);

    basket?.forEach((each) => {
      basketSubscription.push(each.item.id);
    });
    //Generate the client secret from Stripe that allows charge to customer, and regen if basket changes
    if (basketSubscription.find((each) => each !== "subscription")) {
      const getClientSecret = async () => {
        const response = await axios({
          method: "post",
          //Stripe expects total in cents so * 100
          url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
        });
        setClientSecret(response.data.clientSecret);
        setDisabledClientSecret(false);
      };
      getClientSecret();
    }
  }, []);
  //
  //
  //console.log("THE SECRET IS >>>>", clientSecret);

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const handleSubscription = async (e) => {
    e.preventDefault();
    setProcessing(true);
    if (!stripe || !elements) {
      //Stripe hasnt loaded yet
      return;
    }

    const result = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        name: user.user.providerData[0].displayName,
        email: user.user.providerData[0].email,
      },
    });
    if (result.error) {
      console.log("EREOORR", result.error);
    } else {
      const response = await axios.post("/payments/sub", {
        payment_method: result.paymentMethod.id,
        email: user.user.email,
        name: user.user.providerData[0].displayName,
      });
      console.log("REPSONSE", response);

      if (response.data.status === "requires_action") {
        stripe
          .confirmCardPayment(response.data.client_secret, {
            payment_method: {
              //Find Card element
              card: elements.getElement(CardElement),
              billing_details: {
                name: user.user.providerData[0].displayName,
                email: user.user.providerData[0].email,
              },
            },
          })
          .then(async (result) => {
            console.log("THIS IS RESULY", result);
            if (result.error) {
              console.log("ERRORR", result.error);
              toast("Something went wrong 😤", {
                type: "error",
              });
            } else {
              await database
                .collection("users")
                .doc(user.uid)
                .collection("orders")
                .doc(result.paymentIntent.id)
                .set({
                  paymentMethod: "Stripe Subscription",
                  basket: [
                    {
                      id: "subscription",
                      price: 200,
                      title: "Subscription",
                    },
                  ],
                  amount: result.paymentIntent.amount,
                  created: result.paymentIntent.created,
                  subscriptionId: response.data.subscriptionId,
                });
              toast("Success! Please visit the Dashboard to get reading!", {
                type: "success",
              });
              startSetOrders();
              emptyBasket();

              // window.location.replace("/orders");
              window.location.replace("/orders");
            }
          });
      } else {
        console.log("THIS IS RESPONSE", response);
        await database
          .collection("users")
          .doc(user.uid)
          .collection("orders")
          .doc(response.data.paymentIntent)
          .set({
            paymentMethod: "Stripe Subscription",
            basket: subscriptionBasket,
            amount: response.data.amount,
            created: response.data.created,
            subscriptionId: response.data.subscriptionId,
          });
        toast("Success! Please visit the Dashboard to get reading!", {
          type: "success",
        });
        startSetOrders();
        emptyBasket();

        window.location.replace("/orders");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      //Stripe hasnt loaded yet
      return;
    }

    //Uses the client screnet for how much to charge
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          //Find Card element
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.user.displayName,
            email: user.user.email,
          },
        },
      })
      .then(({ paymentIntent, error }) => {
        // look at this object
        //paymentIntent = payent confiramtion
        if (error) {
          setProcessing(false);
          throw new Error(error.message);
        }
        toast("Success! Please visit the Dashboard to get reading!", {
          type: "success",
        });
        setsucceeded(true);
        setError(null);
        setProcessing(false);
        database
          .collection("users")
          .doc(user.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            paymentMethod: "Stripe",
            basket: subscriptionBasket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });
      })
      .then(() => {
        window.location.replace("/orders");
        startSetOrders();
        emptyBasket();
      })
      .catch((e) => {
        toast("Something went wrong", { type: "error" });
        setError(e.message);
      });
  };

  // CardElement change
  const handleChange = (e) => {
    setDisabledError(e.empty);
    setError(e.error ? e.error.message : "");
  };

  // const oneTimePayment = async () => {
  //   const response = await axios.post("/v2/checkout/orders");
  // };

  return (
    <div>
      <h1>CHECKOUT ({basket?.length} Items)</h1>
      {basket.length !== 0
        ? basket.map((each, index) => {
            return (
              <Product
                id={each.item.id}
                title={each.item.title}
                price={each.item.price}
                image={each.item.image}
                key={index}
                hideButton={true}
              />
            );
          })
        : "Please add something to your basket"}

      <form onSubmit={handleSubmit}>
        <CardElement options={CARD_ELEMENT_OPTIONS} onChange={handleChange} />
        <div className="payment__priceContainer">
          <CurrencyFormat
            renderText={(value) => (
              <>
                <h3 className="payment__total">Order Total: {value}</h3>
              </>
            )}
            decimalScale={2}
            value={getBasketTotal(basket)}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
          />
          {/* <button
            disabled={
              processing || disabledClientSecret || disabledError || succeeded
            }
          >
            <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
          </button> */}
          <button
            disabled={processing || disabledError || succeeded}
            onClick={handleSubscription}
          >
            {processing ? <p>Processing</p> : "Buy Subscription"}
          </button>
        </div>

        {error && <div>{error}</div>}
        <div ref={paypal}></div>
      </form>
      <div id="paypal-button-container-P-6D95325839119752TMCOLDJY"></div>
    </div>
  );
};

const mapStoreToProps = (state, props) => ({
  user: state.authentication,
  basket: state.basket,
});

const mapDispatchToProps = (dispatch) => ({
  emptyBasket: () => dispatch(emptyBasket()),
  addOrder: (order) => dispatch(addOrder(order)),
  startSetOrders: () => dispatch(startSetOrders()),
});

export default connect(mapStoreToProps, mapDispatchToProps)(Payment);
