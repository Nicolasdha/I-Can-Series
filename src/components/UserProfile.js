import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { auth } from "../firebase/firebase";
import axios from "../axios/axios";

const UserProfile = ({ user, orders }) => {
  const createdAtDate = new Date(parseInt(user.metadata?.a)).toDateString();
  const lastLogin = new Date(parseInt(user.metadata?.b)).toDateString(); // really need this b/c itll always be the current date?
  const [email, setEmail] = useState("");
  const [pageMessage, setPageMessage] = useState(false);
  const [hasSubscription, setHasSubscription] = useState(false);
  const [subscriptionId, setSubscriptionId] = useState("");

  useEffect(() => {
    orders[1]?.orderIds.forEach((each) => {
      if (each === "subscription") {
        setHasSubscription(true);
      }
    });
    if (hasSubscription) {
      orders[0]?.orders.forEach((each) => {
        if (each.subscriptionId) {
          setSubscriptionId(each.subscriptionId);
        }
      });
    }
    console.log(subscriptionId);

    console.log("🐱", subscriptionId);
  }, [hasSubscription, subscriptionId]);

  const changeEmail = (e) => {
    auth.currentUser
      .updateEmail(email)
      .then((ref) => {
        console.log("changed email");
        console.log(ref);
      })
      .catch((error) => {
        setPageMessage(error);
        console.log(error);
        // alert(error.message);
      });
  };

  const cancelSubscription = async (e) => {
    const response = await axios.post("/payments/sub/cancel", {
      // payment_method: result.paymentMethod.id,
      // email: user.user.email,
      // name: user.user.providerData[0].displayName,
      subscriptionId: subscriptionId,
    });
  };

  return (
    <div>
      <p>{user.providerData[0].displayName}</p>
      <p>{user.email}</p> {/* Only email for password login? Twit doest show */}
      <p>Profile Created: {createdAtDate}</p>
      <h4>Update email</h4>
      <input
        placeholder="Update email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={changeEmail}>Submit</button>
      <p>
        {subscriptionId && (
          <button onClick={cancelSubscription}>Cancel Subscription</button>
        )}
      </p>
      {pageMessage && <h2>{pageMessage}</h2>}
    </div>
  );
};

const mapStoreToProps = (state, props) => ({
  user: state.authentication.user,
  orders: state.orders,
});

export default connect(mapStoreToProps, undefined)(UserProfile);
