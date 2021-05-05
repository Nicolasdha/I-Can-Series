import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
// import expensesReducer from "../reducers/expenses";
import characterReducer from "../reducers/character";
import basketReducer from "../reducers/basket";
import authReducer from "../reducers/auth";
import ordersReducer from "../reducers/orders";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = () => {
  const store = createStore(
    combineReducers({
      basket: basketReducer,
      orders: ordersReducer,
      character: characterReducer,
      authentication: authReducer,
    }),
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};
export default store;
