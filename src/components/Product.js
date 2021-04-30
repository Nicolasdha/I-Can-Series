import React from "react";
import { connect } from "react-redux";

import { addToBasket } from "../actions/basket";
import { removeFromBasket } from "../actions/basket";

const Product = ({
  id,
  title,
  price,
  image,
  hideButton,
  addToBasket,
  removeFromBasket,
}) => {
  const addToBasketClick = () => {
    addToBasket({
      item: {
        id,
        title,
        image,
        price,
      },
    });
  };

  const removeFromBasketClick = (e) => {
    removeFromBasket(id);
  };

  return (
    <div>
      <h1>{title}</h1>
      <h3>{price}</h3>
      <p>{image}</p>
      {!hideButton ? (
        <button onClick={addToBasketClick}>Add to basket</button>
      ) : (
        <button onClick={removeFromBasketClick}>remove</button>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addToBasket: (item) => dispatch(addToBasket(item)),
  removeFromBasket: (item) => dispatch(removeFromBasket(item)),
});
export default connect(undefined, mapDispatchToProps)(Product);
