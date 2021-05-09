import React, { useEffect, useState } from "react";
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
  orders,
}) => {
  const alreadyOrdered = [];
  const [subscription, setSubscription] = useState(false);
  const [sleep, setSleep] = useState(false);
  const [school, setSchool] = useState(false);

  useEffect(() => {
    orders[0]?.orders.forEach((each) => {
      each.basket.forEach((eachBasket) => {
        alreadyOrdered.push(eachBasket.item.id);
      });
    });
    console.log(alreadyOrdered);
    const hasSubscription = alreadyOrdered.includes("subscription");
    setSubscription(hasSubscription);
    const hasSleep = alreadyOrdered.includes("sleep");
    setSleep(hasSleep);
    const hasSchool = alreadyOrdered.includes("school");
    setSchool(hasSchool);
  }, []);

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

      {id === "subscription" && !hideButton && (
        <button disabled={false} onClick={addToBasketClick}>
          Add to basket
        </button>
      )}
      {id === "subscription" && hideButton && (
        <button onClick={removeFromBasketClick}>remove</button>
      )}
      {id === "sleep" && !hideButton && (
        <button disabled={false} onClick={addToBasketClick}>
          Add to basket
        </button>
      )}
      {id === "sleep" && hideButton && (
        <button onClick={removeFromBasketClick}>remove</button>
      )}
      {id === "school" && !hideButton && (
        <button disabled={false} onClick={addToBasketClick}>
          Add to basket
        </button>
      )}
      {id === "school" && hideButton && (
        <button onClick={removeFromBasketClick}>remove</button>
      )}
    </div>
  );
};

// NEED TO CHANGE DISABLED BACKED TO STATE VAIRABLES

const mapDispatchToProps = (dispatch) => ({
  addToBasket: (item) => dispatch(addToBasket(item)),
  removeFromBasket: (item) => dispatch(removeFromBasket(item)),
});

const mapStoreToProps = (state, props) => ({
  orders: state.orders,
});

export default connect(mapStoreToProps, mapDispatchToProps)(Product);

// before disabling button
// {!hideButton ? (
//   <button onClick={addToBasketClick}>Add to basket</button>
// ) : (
//   <button onClick={removeFromBasketClick}>remove</button>
// )}
