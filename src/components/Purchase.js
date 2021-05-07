import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Product from "./Product";

const Purchase = (props) => {
  return (
    <div>
      <Product
        id="sleep"
        title="Time for Sleep Series - 7 Books on how to initiate bedtime"
        price={49.99}
        image="https://images-na.ssl-images-amazon.com/images/I/61TiYyagO9L._AC_SX355_.jpg"
        key={1}
      />
      <Product
        id="school"
        title="Time for School Series - 7 Books on how to initiate school time"
        price={49.99}
        image="https://images-na.ssl-images-amazon.com/images/I/61TiYyagO9L._AC_SX355_.jpg"
        key={2}
      />
      <Product
        id="subscription"
        title="Monthly subscription - Get access to exclusive content and all books"
        price={99.99}
        image="https://images-na.ssl-images-amazon.com/images/I/61TiYyagO9L._AC_SX355_.jpg"
        key={3}
      />
      <p>Basket length</p>
      <h3>{props.basket?.length}</h3>
      {
        <Link to="/basket">
          <p>Go to Basket</p>
        </Link>
      }
    </div>
  );
};

const mapStoreToProps = (state, props) => ({
  basket: state.basket,
});

export default connect(mapStoreToProps, undefined)(Purchase);
