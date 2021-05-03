import React from "react";
import {
  Router,
  Route,
  Switch,
  BrowserRouter,
  useHistory,
} from "react-router-dom";
import { createBrowserHistory } from "history";

//Components
import App from "../components/App";
import Header from "../components/Header";
import NotFoundPage from "../components/404";
import Dashboard from "../components/Dashboard";
import Login from "../components/Login";
import CharacterSelection from "../components/CharacterSelection";
import BookSelection from "../components/BookSelection";
import Purchase from "../components/Purchase";
import Payment from "../components/Payment";
import EditCharacter from "../components/EditCharacter";
import Basket from "../components/Basket";

//Routes
import timeForSleepRoutes from "./timeForSleepRoutes";
import timeForSchoolRoutes from "./timeForSchoolRoutes";
export const history = createBrowserHistory();
const AppRouter = (
  // Need <Router history={history}/> here but idk why
  <Router history={history}>
    <Header />
    <Switch>
      <Route exact={true} path="/" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/login" component={App} />
      <Route path="/edit/:nickname" component={EditCharacter} />
      <Route path="/characterSelection" component={CharacterSelection} />
      <Route path="/bookSelection" component={BookSelection} />
      <Route path="/purchase" component={Purchase} />
      <Route path="/basket" component={Basket} />
      <Route path="/payment" component={Payment} />
      {timeForSchoolRoutes}
      {timeForSleepRoutes}
      <Route component={NotFoundPage} />
    </Switch>
  </Router>
);

export default AppRouter;
