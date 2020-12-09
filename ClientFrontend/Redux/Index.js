import { createStore, combineReducers, applyMiddleware } from "redux";
import DrawerReducer from "./Reducers/DrawerReducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
const allReducers = combineReducers({
  DrawerReducer,
});
const middleware = [thunk];
const store = createStore(
  allReducers,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
