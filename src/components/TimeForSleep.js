import React, { useState } from "react";
import { useHistory } from "react-router-dom";
const TimeForSleep = () => {
  const history = useHistory();
  const [bookSeries, setBookSeries] = useState(null);
  const [book, setBook] = useState(null);
  const onSubmit = (e) => {
    e.preventDefault();
    history.push(`/${bookSeries}/${book}/Page1`);
  };

  const onChange = (e) => {
    setBook(e.target.value);
    setBookSeries(e.target.name);
  };
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="timeForSleep">Time For Sleep</label>
      <br></br>
      <select onChange={onChange} name="timeForSleep">
        <option>-- Select Book --</option>
        <option value="book1">Book 1</option>
        <option value="book2">Book 2</option>
        <option value="book3">Book 3</option>
        <option value="book4">Book 4</option>
        <option value="book5">Book 5</option>
        <option value="book6">Book 6</option>
        <option value="book7">Book 7</option>
      </select>
      <button type="submit">Submit</button>
      <br></br>
    </form>
  );
};

export default TimeForSleep;
