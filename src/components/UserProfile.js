import React, { useState } from "react";
import { connect } from "react-redux";
import { auth } from "../firebase/firebase";

const UserProfile = ({ user }) => {
  const createdAtDate = new Date(parseInt(user.metadata?.a)).toDateString();
  const lastLogin = new Date(parseInt(user.metadata?.b)).toDateString(); // really need this b/c itll always be the current date?
  const [email, setEmail] = useState("");
  const [pageMessage, setPageMessage] = useState(false);

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
      {pageMessage && <h2>{pageMessage}</h2>}
    </div>
  );
};

const mapStoreToProps = (state, props) => ({
  user: state.authentication.user,
});

export default connect(mapStoreToProps, undefined)(UserProfile);
