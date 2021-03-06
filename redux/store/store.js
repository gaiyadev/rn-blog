import { createStore, compose, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import rootReducer from "../reducers/rootReducer";

const initialState = {};

const middleware = [reduxThunk];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
