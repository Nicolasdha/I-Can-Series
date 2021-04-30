import React from "react";
import {
  Router,
  Route,
  Switch,
  BrowserRouter,
  useHistory,
} from "react-router-dom";

import App from "../components/App";
import NotFoundPage from "../components/404";
import Dashboard from "../components/Dashboard";
import Login from "../components/Login";
import CharacterSelection from "../components/CharacterSelection";
import BookSelection from "../components/BookSelection";
import Purchase from "../components/Purchase";
import Payment from "../components/Payment";

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
import Basket from "../components/Basket";

const AppRouter = (
  // Need <Router history={history}/> here but idk why
  <BrowserRouter>
    <div>
      <Switch>
        <Route exact={true} path="/" component={App} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/characterSelection" component={CharacterSelection} />
        <Route path="/bookSelection" component={BookSelection} />
        <Route path="/purchase" component={Purchase} />
        <Route path="/basket" component={Basket} />
        <Route path="/payment" component={Payment} />

        <Route path="/TimeForSleep/book1/page1" component={timeForSleepB1p1} />
        <Route path="/TimeForSleep/book1/page2" component={timeForSleepB1p2} />
        <Route path="/TimeForSleep/book2/page1" component={timeForSleepB2p1} />
        <Route path="/TimeForSleep/book2/page2" component={timeForSleepB2p2} />
        <Route path="/TimeForSleep/book3/page1" component={timeForSleepB3p1} />
        <Route path="/TimeForSleep/book3/page2" component={timeForSleepB3p2} />
        <Route path="/TimeForSleep/book4/page1" component={timeForSleepB4p1} />
        <Route path="/TimeForSleep/book4/page2" component={timeForSleepB4p2} />
        <Route path="/TimeForSleep/book5/page1" component={timeForSleepB5p1} />
        <Route path="/TimeForSleep/book5/page2" component={timeForSleepB5p2} />
        <Route path="/TimeForSleep/book6/page1" component={timeForSleepB6p1} />
        <Route path="/TimeForSleep/book6/page2" component={timeForSleepB6p2} />
        <Route path="/TimeForSleep/book7/page1" component={timeForSleepB7p1} />
        <Route path="/TimeForSleep/book7/page2" component={timeForSleepB7p2} />

        <Route
          path="/TimeForSchool/book1/page1"
          component={timeForSchoolB1p1}
        />
        <Route
          path="/TimeForSchool/book1/page2"
          component={timeForSchoolB1p2}
        />
        <Route
          path="/TimeForSchool/book2/page1"
          component={timeForSchoolB2p1}
        />
        <Route
          path="/TimeForSchool/book2/page2"
          component={timeForSchoolB2p2}
        />
        <Route
          path="/TimeForSchool/book3/page1"
          component={timeForSchoolB3p1}
        />
        <Route
          path="/TimeForSchool/book3/page2"
          component={timeForSchoolB3p2}
        />
        <Route
          path="/TimeForSchool/book4/page1"
          component={timeForSchoolB4p1}
        />
        <Route
          path="/TimeForSchool/book4/page2"
          component={timeForSchoolB4p2}
        />
        <Route
          path="/TimeForSchool/book5/page1"
          component={timeForSchoolB5p1}
        />
        <Route
          path="/TimeForSchool/book5/page2"
          component={timeForSchoolB5p2}
        />
        <Route
          path="/TimeForSchool/book6/page1"
          component={timeForSchoolB6p1}
        />
        <Route
          path="/TimeForSchool/book6/page2"
          component={timeForSchoolB6p2}
        />
        <Route
          path="/TimeForSchool/book7/page1"
          component={timeForSchoolB7p1}
        />
        <Route
          path="/TimeForSchool/book7/page2"
          component={timeForSchoolB7p2}
        />

        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
