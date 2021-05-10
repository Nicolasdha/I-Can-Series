import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import TimeForSleep from "./TimeForSleep";
import TimeForSchool from "./TimeforSchool";

const BookSelection = ({ orders }) => {
  const [subscription, setSubscription] = useState(false);
  const [sleep, setSleep] = useState(false);
  const [school, setSchool] = useState(false);

  useEffect(() => {
    const isSubscription = orders[1]?.orderIds.includes("subscription");
    setSubscription(isSubscription);
    const isSleep = orders[1]?.orderIds.includes("sleep");
    setSleep(isSleep);
    const isSchool = orders[1]?.orderIds.includes("school");
    setSchool(isSchool);
  }, []);

  // console.log(orders);

  return (
    <div>
      <h1>Choose a book</h1>

      {subscription && (
        <div>
          <TimeForSleep />
          <TimeForSchool />
        </div>
      )}
      {!subscription && sleep && (
        <div>
          <TimeForSleep />
        </div>
      )}
      {!subscription && school && (
        <div>
          <TimeForSchool />
        </div>
      )}
      {!subscription && !school && !sleep && (
        <p>Please purchase a book to get reading!!</p>
      )}
    </div>
  );
};
const mapStoreToProps = (state, props) => ({
  orders: state.orders,
});
export default connect(mapStoreToProps, undefined)(BookSelection);

// const history = useHistory();
// const [bookSeries, setBookSeries] = useState(null);
// const [book, setBook] = useState(null);
// const onSubmit = (e) => {
//   e.preventDefault();
//   history.push(`/${bookSeries}/${book}/Page1`);
// };

// const onChange = (e) => {
//   setBook(e.target.value);
//   setBookSeries(e.target.name);
// };
// <form onSubmit={onSubmit}>
//         <label htmlFor="timeForSleep">Time For Sleep</label>
//         <br></br>
//         <select onChange={onChange} name="timeForSleep">
//           <option>-- Select Book --</option>
//           <option value="book1">Book 1</option>
//           <option value="book2">Book 2</option>
//           <option value="book3">Book 3</option>
//           <option value="book4">Book 4</option>
//           <option value="book5">Book 5</option>
//           <option value="book6">Book 6</option>
//           <option value="book7">Book 7</option>
//         </select>
//         <button type="submit">Submit</button>
//         <br></br>
//         <label htmlFor="timeForSchool">Time For School</label>
//         <br></br>
//         <select onChange={onChange} name="timeForSchool">
//           <option>-- Select Book --</option>
//           <option value="book1">Book 1</option>
//           <option value="book2">Book 2</option>
//           <option value="book3">Book 3</option>
//           <option value="book4">Book 4</option>
//           <option value="book5">Book 5</option>
//           <option value="book6">Book 6</option>
//           <option value="book7">Book 7</option>
//         </select>
//         <button type="submit">Submit</button>
//       </form>
