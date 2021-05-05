import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import CurrencyFormat from "react-currency-format";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import Product from "./Product";
import getBasketTotal from "../selectors/basketTotal";
import axios from "../axios/axios";
import { emptyBasket } from "../actions/basket";
import { addOrder } from "../actions/orders";
import { database } from "../firebase/firebase";

const Payment = ({ basket, emptyBasket, userUID, addOrder }) => {
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();

  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabledError, setDisabledError] = useState(true);
  const [disabledClientSecret, setDisabledClientSecret] = useState(true);
  const [succeeded, setsucceeded] = useState(false);

  useEffect(() => {
    //Generate the client secret from Stripe that allows charge to customer, and regen if basket changes
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
  }, [basket]);
  console.log("THE SECRET IS >>>>", clientSecret);
  //

  // Fancy stripe stuff with form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    //Uses the client screnet for how much to charge
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          //Find Card element
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // look at this object
        //paymentIntent = payent confiramtion
        console.log("🐱", paymentIntent);
        setsucceeded(true);
        setError(null);
        setProcessing(false);
        database
          .collection("users")
          .doc(userUID)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });
        addOrder({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
        emptyBasket();
        history.replace("/orders");
      });
  };

  // CardElement change
  const handleChange = (e) => {
    setDisabledError(e.empty);
    setError(e.error ? e.error.message : "");
  };

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
        <CardElement onChange={handleChange} />
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
          <button
            disabled={
              processing || disabledClientSecret || disabledError || succeeded
            }
          >
            <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
          </button>
        </div>

        {error && <div>{error}</div>}
      </form>
    </div>
  );
};

const mapStoreToProps = (state, props) => ({
  userUID: state.authentication.uid,
  basket: state.basket,
});
const mapDispatchToProps = (dispatch) => ({
  emptyBasket: () => dispatch(emptyBasket()),
  addOrder: (order) => dispatch(addOrder(order)),
});

export default connect(mapStoreToProps, mapDispatchToProps)(Payment);

// What is the button distabled thing that I did with amazon
