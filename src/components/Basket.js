import React from "react";
import { connect } from "react-redux";

import Product from "./Product";
import Subtotal from "./Subtotal";

const Basket = ({ basket }) => {
  console.log(basket);

  return (
    <div>
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
      <Subtotal />
    </div>
  );
};

const mapStoreToProps = (state, props) => ({
  basket: state.basket,
});

export default connect(mapStoreToProps, undefined)(Basket);
