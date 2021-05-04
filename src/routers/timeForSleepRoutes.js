import PrivateRoute from "./PrivateRoute";

// -------------------- TIME FOR SLEEP ----------
//Book 1
import timeForSleepB1p1 from "../components/series/timeForSleep/Book1/Page1";
import timeForSleepB1p2 from "../components/series/timeForSleep/Book1/Page2";
//Book 2
import timeForSleepB2p1 from "../components/series/timeForSleep/Book2/Page1";
import timeForSleepB2p2 from "../components/series/timeForSleep/Book2/Page2";
//Book 3
import timeForSleepB3p1 from "../components/series/timeForSleep/Book3/Page1";
import timeForSleepB3p2 from "../components/series/timeForSleep/Book3/Page2";
//Book 4
import timeForSleepB4p1 from "../components/series/timeForSleep/Book4/Page1";
import timeForSleepB4p2 from "../components/series/timeForSleep/Book4/Page2";
//Book 5
import timeForSleepB5p1 from "../components/series/timeForSleep/Book5/Page1";
import timeForSleepB5p2 from "../components/series/timeForSleep/Book5/Page2";
//Book 6
import timeForSleepB6p1 from "../components/series/timeForSleep/Book6/Page1";
import timeForSleepB6p2 from "../components/series/timeForSleep/Book6/Page2";
//Book 7
import timeForSleepB7p1 from "../components/series/timeForSleep/Book7/Page1";
import timeForSleepB7p2 from "../components/series/timeForSleep/Book7/Page2";

const timeForSleepRoutes = [
  <PrivateRoute
    key={2000}
    path="/TimeForSleep/book1/page1"
    component={timeForSleepB1p1}
  />,
  <PrivateRoute
    key={2000}
    path="/TimeForSleep/book1/page2"
    component={timeForSleepB1p2}
  />,
  <PrivateRoute
    key={2000}
    path="/TimeForSleep/book2/page1"
    component={timeForSleepB2p1}
  />,
  <PrivateRoute
    key={2000}
    path="/TimeForSleep/book2/page2"
    component={timeForSleepB2p2}
  />,
  <PrivateRoute
    key={2000}
    path="/TimeForSleep/book3/page1"
    component={timeForSleepB3p1}
  />,
  <PrivateRoute
    key={2000}
    path="/TimeForSleep/book3/page2"
    component={timeForSleepB3p2}
  />,
  <PrivateRoute
    key={2000}
    path="/TimeForSleep/book4/page1"
    component={timeForSleepB4p1}
  />,
  <PrivateRoute
    key={2000}
    path="/TimeForSleep/book4/page2"
    component={timeForSleepB4p2}
  />,
  <PrivateRoute
    key={2000}
    path="/TimeForSleep/book5/page1"
    component={timeForSleepB5p1}
  />,
  <PrivateRoute
    key={2000}
    path="/TimeForSleep/book5/page2"
    component={timeForSleepB5p2}
  />,
  <PrivateRoute
    key={2000}
    path="/TimeForSleep/book6/page1"
    component={timeForSleepB6p1}
  />,
  <PrivateRoute
    key={2000}
    path="/TimeForSleep/book6/page2"
    component={timeForSleepB6p2}
  />,
  <PrivateRoute
    key={2000}
    path="/TimeForSleep/book7/page1"
    component={timeForSleepB7p1}
  />,
  <PrivateRoute
    key={2000}
    path="/TimeForSleep/book7/page2"
    component={timeForSleepB7p2}
  />,
];

export default timeForSleepRoutes;
