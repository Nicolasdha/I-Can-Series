import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import book1 from "../images/book1.png";
import book2 from "../images/book2.jpeg";
import book3 from "../images/book3.png";
import Product from "./Product";

const Purchase = (props) => {
  return (
    <div>
      {/* <h2>
        Monthly subscription - Get access to exclusive content and all books
      </h2>
      <p>$99.99</p>
      <Link to="/subscription">
        <button>Learn more</button>
      </Link> */}
      <div>
        <div>
          <h1>
            Monthly subscription - Get access to exclusive content and all books
          </h1>
          <img src={book3} />
          <h3>199.99</h3>
          <Link to="/subscription">
            <button>Purchase subscription</button>
          </Link>
          <br></br>
        </div>
      </div>
      <Product
        id="sleep"
        title="Time for Sleep Series - 7 Books on how to initiate bedtime"
        price={49.99}
        image={book1}
        key={1}
      />
      <Product
        id="school"
        title="Time for School Series - 7 Books on how to initiate school time"
        price={49.99}
        image={book2}
        key={2}
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
