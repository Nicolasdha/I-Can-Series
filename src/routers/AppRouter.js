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
import UserProfile from "../components/UserProfile";
import NewUserCreation from "../components/NewUserCreation";
import ResetPassword from "../components/ResetPassword";
import CharacterSelection from "../components/CharacterSelection";
import BookSelection from "../components/BookSelection";
import Purchase from "../components/Purchase";
import Payment from "../components/Payment";
import PaymentComplete from "../components/PaymentComplete";
import Subscription from "../components/Subscription";
import Orders from "../components/Orders";
import EditCharacter from "../components/EditCharacter";
import Basket from "../components/Basket";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PrivateRoute";

//Routes
import timeForSleepRoutes from "./timeForSleepRoutes";
import timeForSchoolRoutes from "./timeForSchoolRoutes";
export const history = createBrowserHistory();
const AppRouter = (
  // Need <Router history={history}/> here but idk why
  <Router history={history}>
    {/* <Header /> */}
    <Switch>
      <Route exact={true} path="/" component={Login} />
      <Route path="/createNewUser" component={NewUserCreation} />
      <Route path="/reset" component={ResetPassword} />
      <Route path="/login" component={App} />
      <PrivateRoute path="/dashboard" component={Dashboard} />

      <PrivateRoute path="/edit/:nickname" component={EditCharacter} />
      <PrivateRoute path="/UserProfile" component={UserProfile} />
      <PrivateRoute path="/characterSelection" component={CharacterSelection} />
      <PrivateRoute path="/bookSelection" component={BookSelection} />
      <PrivateRoute path="/purchase" component={Purchase} />
      <PrivateRoute path="/basket" component={Basket} />
      <PrivateRoute path="/payment" component={Payment} />
      <PrivateRoute path="/subscription" component={Subscription} />
      <PrivateRoute path="/orders" component={Orders} />
      <PrivateRoute path="/paymentComplete" component={PaymentComplete} />
      {timeForSchoolRoutes}
      {timeForSleepRoutes}
      <Route component={NotFoundPage} />
    </Switch>
  </Router>
);

export default AppRouter;
