import { BrowserRouter, Route, Router, Switch } from "react-router-dom";

// -------------------- TIME FOR SCHOOL ----------
//Book 1
import timeForSchoolB1p1 from "../components/series/timeForSchool/Book1/Page1";
import timeForSchoolB1p2 from "../components/series/timeForSchool/Book1/Page2";
//Book 2
import timeForSchoolB2p1 from "../components/series/timeForSchool/Book2/Page1";
import timeForSchoolB2p2 from "../components/series/timeForSchool/Book2/Page2";
//Book 3
import timeForSchoolB3p1 from "../components/series/timeForSchool/Book3/Page1";
import timeForSchoolB3p2 from "../components/series/timeForSchool/Book3/Page2";
//Book 4
import timeForSchoolB4p1 from "../components/series/timeForSchool/Book4/Page1";
import timeForSchoolB4p2 from "../components/series/timeForSchool/Book4/Page2";
//Book 5
import timeForSchoolB5p1 from "../components/series/timeForSchool/Book5/Page1";
import timeForSchoolB5p2 from "../components/series/timeForSchool/Book5/Page2";
//Book 6
import timeForSchoolB6p1 from "../components/series/timeForSchool/Book6/Page1";
import timeForSchoolB6p2 from "../components/series/timeForSchool/Book6/Page2";
//Book 7
import timeForSchoolB7p1 from "../components/series/timeForSchool/Book7/Page1";
import timeForSchoolB7p2 from "../components/series/timeForSchool/Book7/Page2";

const timeForSleepRoutes = [
  <Route
    key={1000}
    path="/TimeForSchool/book1/page1"
    component={timeForSchoolB1p1}
  />,
  <Route
    key={1000}
    path="/TimeForSchool/book1/page2"
    component={timeForSchoolB1p2}
  />,
  <Route
    key={1000}
    path="/TimeForSchool/book2/page1"
    component={timeForSchoolB2p1}
  />,
  <Route
    key={1000}
    path="/TimeForSchool/book2/page2"
    component={timeForSchoolB2p2}
  />,
  <Route
    key={1000}
    path="/TimeForSchool/book3/page1"
    component={timeForSchoolB3p1}
  />,
  <Route
    key={1000}
    path="/TimeForSchool/book3/page2"
    component={timeForSchoolB3p2}
  />,
  <Route
    key={1000}
    path="/TimeForSchool/book4/page1"
    component={timeForSchoolB4p1}
  />,
  <Route
    key={1000}
    path="/TimeForSchool/book4/page2"
    component={timeForSchoolB4p2}
  />,
  <Route
    key={1000}
    path="/TimeForSchool/book5/page1"
    component={timeForSchoolB5p1}
  />,
  <Route
    key={1000}
    path="/TimeForSchool/book5/page2"
    component={timeForSchoolB5p2}
  />,
  <Route
    key={1000}
    path="/TimeForSchool/book6/page1"
    component={timeForSchoolB6p1}
  />,
  <Route
    key={1000}
    path="/TimeForSchool/book6/page2"
    component={timeForSchoolB6p2}
  />,
  <Route
    key={1000}
    path="/TimeForSchool/book7/page1"
    component={timeForSchoolB7p1}
  />,
  <Route
    key={1000}
    path="/TimeForSchool/book7/page2"
    component={timeForSchoolB7p2}
  />,
];

export default timeForSleepRoutes;
