import React from "react";
import { connect } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import Product from "./Product";

const promise = loadStripe(
  "pk_test_51InSTbLFkWX2uXtIaZFhkPe2jaq1jR4ZZMGDHyeCBuoiqOvHTc7wIgDByYId3XZZgaMc54pjW26yNF4tt02ZfXiO002BJqMF0t"
);

const Payment = ({ basket }) => {
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
    </div>
  );
};

const mapStoreToProps = (state, props) => ({
  basket: state.basket,
});

export default connect(mapStoreToProps, undefined)(Payment);
